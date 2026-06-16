from datetime import datetime
import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="Krushna Portfolio Backend",
    description="Backend API for portfolio, CV data, contact form and future AI chat assistant.",
    version="1.0.0",
)

# These are frontend URLs allowed to call this backend during development.
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


# This file will store contact form messages.
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
    """
    Read all saved contact messages from messages.json.
    If file does not exist yet, return an empty list.
    """
    if not MESSAGES_FILE.exists():
        return []

    with open(MESSAGES_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_messages(messages):
    """
    Save all contact messages into messages.json.
    """
    with open(MESSAGES_FILE, "w", encoding="utf-8") as file:
        json.dump(messages, file, indent=2, ensure_ascii=False)


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

    return {
        "status": "success",
        "message": "Message received successfully",
        "saved_message": new_message,
    }


@app.get("/api/messages")
def get_messages():
    return {
        "total": len(read_messages()),
        "messages": read_messages(),
    }
