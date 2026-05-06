# VigilAI — Detect. Verify. Protect.

> The AI shield against modern cyber threats. VigilAI orchestrates a 9-agent intelligence pipeline to detect scams, deepfakes, fake news, digital arrest fraud, phishing, and social engineering attacks — in seconds.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB)](https://react.dev)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)](https://ai.google.dev)

## 🛡️ Overview

VigilAI is a production-grade cybersecurity SaaS platform that protects users from the modern threat landscape using a coordinated team of specialized AI agents. Submit any suspicious text, URL, or file — the platform routes it through a 9-agent pipeline that detects, verifies, and reports threats with a forensic-grade evidence trail.

### Threat categories detected
- 🎣 Scam & phishing
- 🎭 Deepfake (audio / video / image)
- 📰 Fake news & misinformation
- ☎️ Digital arrest scams (authority impersonation)
- 🧠 Social engineering manipulation
- 🌐 Malicious URLs & threat-intel correlation

## 🤖 The 9-Agent Pipeline

| # | Agent | Role |
|---|---|---|
| 1 | Orchestrator Agent | Routes & coordinates the pipeline |
| 2 | Scam Detection Agent | Identifies scam/fraud patterns |
| 3 | Fake News Verification Agent | Cross-references claims with trusted sources |
| 4 | Digital Arrest Scam Agent | Detects authority impersonation & extortion |
| 5 | Deepfake Detection Agent | Audio/video/image manipulation analysis |
| 6 | Social Engineering Agent | Manipulation tactic profiling |
| 7 | Threat Intelligence Agent | Correlates indicators with live threat feeds |
| 8 | User Guidance Agent | Generates actionable safety recommendations |
| 9 | Evidence & Report Agent | Compiles the forensic report |

## 🧰 Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend (planned):** Python FastAPI REST API
- **AI:** Google Gemini API (multimodal reasoning)
- **Database:** Firebase Firestore
- **Routing:** React Router v6
- **State / Data:** TanStack Query
- **Deployment:** Vercel (frontend) · Railway (backend)

## 🤝 Partner Integrations

- **Arize AI** — AI observability and model monitoring
- **Elastic** — Security analytics and threat search
- **Fivetran** — Data pipeline and ingestion
- **Google Cloud** — Infrastructure, Gemini API, Firestore, Cloud Run

### Google Cloud services used
- **Vertex AI / Gemini API** — multi-agent reasoning
- **Cloud Firestore** — report storage
- **Cloud Storage** — file uploads (audio/video/images)
- **Cloud Run** — backend hosting
- **Cloud Logging** — observability

## 🚀 Live Demo

🔗 **[Launch VigilAI](https://df706d53-de49-49aa-988d-174ceaccf50e.lovable.app)** *(replace with your published URL)*

## 💻 Run Locally

### Prerequisites
- Node.js 18+ and npm (or [Bun](https://bun.sh))

### Frontend

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/VigilAI.git
cd VigilAI

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Backend (optional, when wired up)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Set the following environment variables:

```bash
GEMINI_API_KEY=your_google_gemini_key
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_CREDENTIALS=path_to_service_account.json
```

## 📁 Project Structure

```
VigilAI/
├── src/
│   ├── components/      # Shared UI (Navbar, Logo, AgentPipeline, RiskMeter)
│   ├── components/ui/   # shadcn/ui primitives
│   ├── pages/           # Index, Dashboard, Result, History
│   ├── lib/             # agents, storage, utils
│   └── index.css        # Design system tokens
├── backend/             # FastAPI service (planned)
├── agents/              # Individual agent logic (planned)
├── docs/                # Architecture & API docs
└── public/              # Static assets
```

## 🗺️ API Endpoints (planned)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/analyze` | Analyze text, URL, or file upload |
| GET | `/api/history` | List past analyses |
| GET | `/api/report/{id}` | Fetch a specific report |
| POST | `/api/report/{id}/download` | Generate PDF report |

## 🎨 Design

Dark cybersecurity aesthetic with blue (`#3B82F6`) and cyan (`#06B6D4`) accents on a `#0A0A0A` background. Animated agent pipeline, real-time risk meter (0–100), and fully responsive.

## 📜 License

[MIT](LICENSE) © VigilAI contributors

---

**VigilAI** · Detect. Verify. Protect.
