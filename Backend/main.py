from datetime import datetime
import json
import os
from pathlib import Path

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from google import genai
from cv_context import CV_CONTEXT

# Load secret values from Backend/.env
load_dotenv()

app = FastAPI(
    title="Krushna Portfolio Backend",
    description="Backend API for portfolio, CV data, contact form, email notification and chat assistant.",
    version="1.0.0",
)

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MESSAGES_FILE = Path("messages.json")


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


PROFILE_DATA = {
    "name": "Krushna Sutariya",
    "role": "Software Developer",
    "location": "Leutkirch im Allgäu, Germany",
    "email": "krushnasutariya19@gmail.com",
    "summary": (
        "Software Engineer with hands-on experience in React, TypeScript, "
        "Python, Docker, CI/CD, Git, and cloud-based application development."
    ),
    "skills": [
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "Docker",
        "AWS",
        "GitHub Actions",
        "WebSockets",
    ],
    "projects": [
        {
            "title": "Portfolio Website",
            "status": "In Progress",
            "tech": ["React", "Tailwind CSS", "Motion"],
        },
        {
            "title": "Sky Map Weather",
            "status": "Live",
            "tech": ["React", "Vite", "React Leaflet", "OpenWeather API"],
        },
    ],
}


def read_messages():
    if not MESSAGES_FILE.exists():
        return []

    with open(MESSAGES_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_messages(messages):
    with open(MESSAGES_FILE, "w", encoding="utf-8") as file:
        json.dump(messages, file, indent=2, ensure_ascii=False)


def send_email_notification(saved_message):
    """
    Send email notification using Resend API.

    If Resend settings are missing in .env, email sending is skipped safely.
    """

    resend_api_key = os.getenv("RESEND_API_KEY")
    resend_from_email = os.getenv("RESEND_FROM_EMAIL")
    resend_to_email = os.getenv("RESEND_TO_EMAIL")

    if not all([resend_api_key, resend_from_email, resend_to_email]):
        return {
            "email_sent": False,
            "provider": "resend",
            "reason": "Resend settings are missing in .env",
        }

    resend.api_key = resend_api_key

    subject = f"New portfolio message from {saved_message['name']}"

    html_message = f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Portfolio Contact Message</h2>

      <p><strong>Name:</strong><br />{saved_message['name']}</p>
      <p><strong>Email:</strong><br />{saved_message['email']}</p>
      <p><strong>Message:</strong><br />{saved_message['message']}</p>
      <p><strong>Received at:</strong><br />{saved_message['created_at']}</p>
    </div>
    """

    try:
        params = {
            "from": resend_from_email,
            "to": [resend_to_email],
            "subject": subject,
            "html": html_message,
            "reply_to": saved_message["email"],
        }

        email_response = resend.Emails.send(params)

        return {
            "email_sent": True,
            "provider": "resend",
            "reason": "Email notification sent successfully",
            "response": email_response,
        }

    except Exception as error:
        return {
            "email_sent": False,
            "provider": "resend",
            "reason": str(error),
        }


def create_ai_chat_reply(user_message, chat_history=None):
    """
    Generate a portfolio assistant reply using Gemini API.
    The assistant answers from CV_CONTEXT, not from random internet knowledge.
    """

    gemini_api_key = os.getenv("GEMINI_API_KEY")

    if not gemini_api_key:
        return (
            "AI assistant is not configured yet. You can still ask about "
            "Krushna's skills, projects, experience, education, and contact."
        )

    if chat_history is None:
        chat_history = []

    recent_history_text = ""
    for item in chat_history[-8:]:
        sender = item.get("sender", "visitor")
        message = item.get("message", "")
        recent_history_text += f"{sender}: {message}\n"

    prompt = f"""
{CV_CONTEXT}

Recent conversation:
{recent_history_text}

Visitor question:
{user_message}

Answer as Krushna's portfolio assistant:
"""

    try:
        client = genai.Client(api_key=gemini_api_key)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        if response.text:
            return response.text.strip()

        return "I understood the question, but I could not generate a clear answer."

    except Exception as error:
        print(f"Gemini API error: {error}")
        return (
            "AI assistant is temporarily unavailable. You can still ask about "
            "Krushna's React, Python, FastAPI, cloud, projects, or BMW internship experience."
        )


@app.get("/")
def home():
    return {"message": "Krushna portfolio backend is running"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "portfolio-backend"}


@app.get("/api/profile")
def get_profile():
    return PROFILE_DATA


@app.post("/api/contact")
def save_contact_message(contact_message: ContactMessage):
    messages = read_messages()

    new_message = {
        "id": len(messages) + 1,
        "name": contact_message.name,
        "email": contact_message.email,
        "message": contact_message.message,
        "created_at": datetime.now().isoformat(timespec="seconds"),
    }

    messages.append(new_message)
    save_messages(messages)

    email_result = send_email_notification(new_message)

    return {
        "status": "success",
        "message": "Message received successfully",
        "saved_message": new_message,
        "email_result": email_result,
    }


@app.get("/api/messages")
def get_messages():
    return {
        "total": len(read_messages()),
        "messages": read_messages(),
    }


@app.websocket("/ws/chat")
async def chat_websocket(websocket: WebSocket):
    """
    WebSocket chat endpoint.

    Frontend connects here and keeps the connection open.
    Every user message receives a backend reply.
    """

    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()
            user_message = data.get("message", "")
            chat_history = data.get("history", [])

            reply = create_ai_chat_reply(user_message, chat_history)

            await websocket.send_json(
                {
                    "sender": "assistant",
                    "message": reply,
                    "created_at": datetime.now().isoformat(timespec="seconds"),
                }
            )

    except WebSocketDisconnect:
        print("Chat client disconnected")
