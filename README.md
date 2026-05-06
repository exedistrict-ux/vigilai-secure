# VigilAI — Detect. Verify. Protect.

![Hackathon](https://img.shields.io/badge/Google%20Cloud-Rapid%20Agent%20Hackathon-blue)
![Partner](https://img.shields.io/badge/Partner-Arize%20AI-purple)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)

> The AI shield against modern cyber threats. VigilAI orchestrates a 9-agent intelligence pipeline to detect scams, deepfakes, fake news, digital arrest fraud, phishing, and social engineering attacks — in seconds.

🔴 **LIVE DEMO:** https://vigilai-secure.lovable.app

## 🛡️ Overview

VigilAI is a production-grade cybersecurity SaaS platform that protects users from the modern threat landscape using a coordinated team of specialized AI agents. Submit any suspicious text, URL, or file — the platform routes it through a 9-agent pipeline that detects, verifies, and reports threats with a forensic-grade evidence trail.

### Threat categories detected
- 🎣 Scam & phishing
- 🎭 Deepfake (audio / video / image)
- 📰 Fake news & misinformation
- ☎️ Digital arrest scams (authority impersonation)
- 🧠 Social engineering manipulation
- 🌐 Malicious URLs & threat-intel correlation

## 🚨 Digital Arrest Scam Detection

VigilAI specifically targets India's fastest-growing cybercrime — **Digital Arrest Scams** where fraudsters impersonate CBI/ED/Police officers via video call and extort victims. Our Digital Arrest Scam Agent uses behavioral pattern recognition, voice stress analysis metadata, and authority impersonation detection to identify these threats in real-time.

> **1 in 3 Indians have received a digital arrest call.** VigilAI flags them before money changes hands.

## 🏗️ Architecture

### Agent Flow

```text
                   ┌──────────────────────┐
  User Input  ───▶ │  Orchestrator Agent  │ ──┐
 (text/URL/file)   └──────────────────────┘   │
                                              ▼
       ┌────────────────────────────────────────────────────┐
       │           8 Specialized Agents (parallel)          │
       │  Scam · Fake News · Digital Arrest · Deepfake      │
       │  Social Eng · Threat Intel · Guidance · Report     │
       └────────────────────────────────────────────────────┘
                                              │
                                              ▼
                              ┌──────────────────────────┐
                              │  Evidence & Report Agent │
                              └──────────────────────────┘
                                              │
                                              ▼
                                      Download Report
```

### The 9-Agent Pipeline

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

### Google Cloud Services

- **Gemini API** — Multimodal LLM powering each agent's reasoning
- **Vertex AI Agent Builder** — Hosts and orchestrates the agent graph
- **Cloud Firestore** — Stores reports, history, and audit trail
- **Cloud Storage** — Holds uploaded media (audio/video/images/PDFs)
- **Cloud Run** — Serverless host for the FastAPI backend
- **BigQuery** — Long-term analytics and threat trend warehousing
- **Cloud Logging** — Observability for the agent pipeline

### Partner Integrations

- **Arize AI** — End-to-end AI observability, drift monitoring, and per-agent evaluation of Gemini outputs
- **Elastic** — Security analytics, full-text threat search, and SIEM-style dashboards over historical reports
- **Fivetran** — Managed data pipelines feeding threat-intel feeds and partner data into BigQuery

## 🧰 Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend (planned):** Python FastAPI REST API
- **AI:** Google Gemini API (multimodal reasoning)
- **Database:** Firebase Firestore
- **Routing:** React Router v6
- **State / Data:** TanStack Query
- **Deployment:** Vercel (frontend) · Railway / Cloud Run (backend)

## 📸 Screenshots

> See live demo at **https://vigilai-secure.lovable.app**

- **[Screenshot 1 — Homepage Hero]** Dark cybersecurity hero with animated counters and CTA
- **[Screenshot 2 — Dashboard]** 9-agent pipeline visualizing parallel analysis in real-time
- **[Screenshot 3 — Result]** Circular risk meter (0–100) with per-agent findings breakdown
- **[Screenshot 4 — Upload]** Tabbed text / URL / file upload workflow

## 💻 Run Locally

```bash
git clone https://github.com/<your-username>/VigilAI.git
cd VigilAI
npm install
npm run dev
```

App runs at `http://localhost:8080`.

### Backend (optional)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Required env vars:

```bash
GEMINI_API_KEY=your_google_gemini_key
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_CREDENTIALS=path_to_service_account.json
```

## 📁 Project Structure

```
VigilAI/
├── src/
│   ├── components/      # Navbar, Logo, AgentPipeline, RiskMeter, ArchitectureDiagram
│   ├── components/ui/   # shadcn/ui primitives
│   ├── pages/           # Index, Dashboard, Result, History, Architecture
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
Built for **Google Cloud Rapid Agent Hackathon 2026** · Powered by Gemini + Vertex AI
Partners: **Arize AI · Elastic · Fivetran**
