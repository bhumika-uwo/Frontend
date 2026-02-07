# A-Series: Advanced AI Ecosystem & Marketplace

Welcome to **A-Series**, a comprehensive AI-powered platform designed to integrate specialized artificial intelligence agents into a unified ecosystem. This project features **AI-Mall**, a marketplace for discovering and deploying AI solutions, alongside powerful business and personal productivity tools.

## 🚀 Project Overview

A-Series is built as a full-stack application, providing a seamless experience for users to interact with, manage, and subscribe to various AI agents.

### Core Components
- **Frontend (`/A-Series`)**: A modern, responsive web application built with React and Vite, featuring a dynamic UI/UX.
- **Backend (`/A-Series_Backend`)**: A robust Node.js/Express API server handling authentication, AI processing, payments, and data management.

---

## ✨ Key Features

### 1. AI-Mall Marketplace
A centralized hub where users can discover, filter, and subscribe to specialized AI agents.
- **Categories:** Business OS, Data & Intelligence, Sales & Marketing, HR & Finance, Design & Creative, Medical & Health AI.
- **Subscription Management:** Easy subscribe/unsubscribe workflows with integrated invoicing.
- **Search & Filtering:** Advanced search capabilities to find the right tool for the job.

### 2. Specialized AI Agents
The platform hosts distinct agent modules tailored for specific needs:
- **AIBIZ (Business Intelligence):** A dedicated agent for generating business strategies, content, and market analysis. capable of handling complex business forms and content generation tasks.
- **AIBASE (Foundational AI):** The core AI assistant framework providing general-purpose conversational capabilities.
- **AI Personal Assistant:** A productivity-focused agent designed to assist with daily tasks, scheduling, and information retrieval.

### 3. Interactive Chat Interface
- **Real-Time Communication:** Instant responses from AI agents.
- **Voice Interaction:** Support for voice input and text-to-speech output for a hands-free experience.
- **Multimodal capabilities:** capable of processing text and potentially other media types.

### 4. Advanced Document Processing
- **File Analysis:** Upload and analyze PDF and DOCX documents.
- **Intelligent Extraction:** Extract key insights and summaries from uploaded files using OCR and AI text analysis.

### 5. Authentication & Security
- **Secure Access:** JWT-based authentication with email verification.
- **Role-Based Access Control:** Differentiated user and admin roles.
- **Compliance:** Built-in Trust, Safety, and Compliance frameworks with dedicated policy management.

### 6. Admin Dashboard
- **Comprehensive Oversight:** Manage users, agents, and platform settings.
- **Analytics:** View revenue reports, user growth, and agent performance metrics.
- **Global Management:** Configure platform-wide settings and policies.

### 7. Global Reach
- **Multi-Language Support:** Fully localized interface using `i18next`, supporting multiple languages for a global user base.

---

## 🛠 Technology Stack

### Frontend (`/A-Series`)
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4), [Styled Components](https://styled-components.com/)
- **State Management:** [Recoil](https://recoiljs.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router](https://reactrouter.com/) (v7)
- **AI Integration:** Google Generative AI SDK
- **Utilities:** Axios, Lucide React, React Icons, html2canvas, jspdf

### Backend (`/A-Series_Backend`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **AI & ML:** 
    - Google Generative AI (Gemini)
    - LangChain (Community, Core, Groq, MongoDB)
    - Xenova Transformers
    - Tesseract.js (OCR)
- **Authentication:** JSON Web Tokens (JWT), BCrypt
- **Cloud Storage:** Cloudinary
- **Payments:** Razorpay Integration
- **Email:** Nodemailer, Resend

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local or Atlas connection string)
- **NPM** or **Yarn**

### 1. Clone the Repository
```bash
git clone <repository_url>
cd A_Series
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd A-Series_Backend
npm install
```

**Environment Configuration:**
Create a `.env` file in `A-Series_Backend` based on `.env.example`. Key variables include:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_API_KEY` (for Gemini)
- `CLOUDINARY_*` credentials
- `RAZORPAY_*` credentials

**Run the Server:**
```bash
npm run dev
# Server runs on http://localhost:5000 (default)
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd A-Series
npm install
```

**Environment Configuration:**
Create a `.env` file in `A-Series` if required (refer to project config).

**Run the Application:**
```bash
npm run dev
# App runs on http://localhost:5173 (default)
```

---

## 📂 Project Structure

```
A_Series/
├── A-Series/               # Frontend Application
│   ├── src/
│   │   ├── agents/         # Specialized Agent Modules (AIBIZ, AIBASE)
│   │   ├── Components/     # Reusable UI Components
│   │   ├── context/        # React Context Providers
│   │   ├── pages/          # Main Application Views (Dashboard, Admin, etc.)
│   │   ├── services/       # API Integration Services
│   │   └── userStore/      # User State Management
│   └── ...
│
├── A-Series_Backend/       # Backend API
│   ├── controllers/        # Request Handlers
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoint Definitions
│   ├── services/           # Business Logic & AI Services
│   └── ...
│
└── README.md               # Project Documentation (This File)
```
