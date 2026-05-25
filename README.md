# Kisan Seva — AI-Powered Farmer Assistance Platform

Kisan Seva is a full-stack agricultural assistance platform designed to help farmers with crop disease diagnosis, AI-powered farming assistance, and market price analysis.

## Features

- AI-powered crop disease diagnosis using Google Gemini API
- Farmer query resolution system
- JWT-based authentication
- Image upload handling
- Market price analytics
- Diagnosis history tracking
- Multilingual support
- Secure REST APIs
- Cloud deployment support

## Tech Stack

### Frontend
- React.js

### Backend
- FastAPI
- Python

### Database
- MySQL

### Authentication
- JWT Authentication

### APIs & Tools
- Google Gemini API

## Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file and add:

```env
GEMINI_API_KEY=your_api_key
JWT_SECRET=your_secret
DATABASE_URL=your_database_url
```

## Future Improvements

- Docker support
- Kubernetes deployment
- Real-time weather integration
- Advanced analytics dashboard

## Author

Yash Vardhan Singh
