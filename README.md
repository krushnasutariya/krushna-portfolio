<p align="center">
  <img src="Frontend/public/favicon..png" alt="Krushna Sutariya KS Logo" width="120" />
</p>

<h1 align="center">Krushna Sutariya - Full-Stack Portfolio Website</h1>

A professional full-stack personal portfolio website built to present my software engineering profile, technical skills, work experience, projects, CV, contact form, and AI-powered portfolio assistant.

## Live Links

Frontend: https://krushnasutariya.github.io/krushna-portfolio/

Backend health check: https://krushnasutariya-krushna-portfolio-backend.hf.space/health

GitHub repository: https://github.com/krushnasutariya/krushna-portfolio

## Overview

This project is a full-stack portfolio platform with a modern React frontend and a FastAPI backend. The frontend is deployed on GitHub Pages, while the backend is deployed on Hugging Face Spaces.

The portfolio includes a responsive user interface, project showcase, downloadable CV, contact form, and a WebSocket-based AI assistant that answers visitor questions using structured CV and project context.

## Features

- Responsive personal portfolio website
- Professional profile sidebar
- About, Resume, Skills, Portfolio, and Contact sections
- Live project showcase
- Downloadable CV
- Contact form with backend validation
- Email notifications using Resend API
- WebSocket-based AI assistant
- Gemini API integration for AI responses
- Structured CV/project context for assistant answers
- Dockerized frontend and backend
- Docker Compose setup for local full-stack execution
- GitHub Actions workflow for frontend deployment
- Frontend deployed on GitHub Pages
- Backend deployed on Hugging Face Spaces

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Motion / Framer Motion
- React Icons
- GitHub Pages

### Backend

- Python
- FastAPI
- Pydantic
- REST APIs
- WebSockets
- Gemini API
- Resend API
- Uvicorn

### DevOps and Deployment

- Docker
- Docker Compose
- GitHub Actions
- GitHub Pages
- Hugging Face Spaces
- Git and GitHub

## Project Structure

```txt
krushna-portfolio/
├── Backend/
│   ├── main.py
│   ├── cv_context.py
│   ├── requirements.txt
│   └── Dockerfile
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
├── .github/
│   └── workflows/
│       └── deploy-frontend.yml
├── docker-compose.yml
└── README.md
```

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/krushnasutariya/krushna-portfolio.git
cd krushna-portfolio
```

### 2. Start with Docker Compose

```bash
docker compose up --build
```

Frontend local URL:

```txt
http://localhost:5173/krushna-portfolio/
```

Backend local URL:

```txt
http://localhost:8000
```

Backend health check:

```txt
http://localhost:8000/health
```

## Environment Variables

The backend requires private API keys. These are not committed to GitHub.

Create a `.env` file inside the `Backend` folder for local development:

```env
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email
RESEND_TO_EMAIL=your_receiver_email
```

The frontend uses Vite environment variables for deployed backend URLs:

```env
VITE_API_BASE_URL=https://krushnasutariya-krushna-portfolio-backend.hf.space
VITE_WS_URL=wss://krushnasutariya-krushna-portfolio-backend.hf.space/ws/chat
```

## Deployment

### Frontend

The frontend is built with Vite and deployed to GitHub Pages using GitHub Actions.

Live frontend:

```txt
https://krushnasutariya.github.io/krushna-portfolio/
```

### Backend

The backend is deployed on Hugging Face Spaces using Docker.

Live backend health endpoint:

```txt
https://krushnasutariya-krushna-portfolio-backend.hf.space/health
```

## Main Projects Shown in Portfolio

- Full-Stack Personal Portfolio Website
- Sky Map Weather Application
- Serverless Online Grocery Application

## Notes

- API keys and private environment variables are excluded from GitHub.
- BMW-related work is described only at a high level because the original code and internal data are confidential.
- The AI assistant uses structured CV and project context and does not access private files.
