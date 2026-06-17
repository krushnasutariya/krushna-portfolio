from datetime import datetime
import json
import os
from pathlib import Path

import resend
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# Load secret values from Backend/.env
load_dotenv()


app = FastAPI(
    title="Krushna Portfolio Backend",
    description="Backend API for portfolio, CV data, contact form and future AI chat assistant.",
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
