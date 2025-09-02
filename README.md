# No-Code AI Workflow Builder

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

This project is a full-stack web application that allows users to visually create and interact with intelligent AI workflows. It was built as a take-home assignment for the Full-Stack Engineer position at AI Planet.

The application enables users to build a Retrieval-Augmented Generation (RAG) pipeline by connecting components on a canvas, uploading a PDF as a knowledge base, and asking questions about it through a chat interface.

## 🎥 Video Demo

[Link to your 2-3 minute video demo on Loom or YouTube]

## ✨ Key Features

- **Visual Workflow Canvas:** A React Flow powered canvas to visually construct AI pipelines.
- **Click-to-Add Nodes:** Easily add components to the canvas with a single click.
- **Node Connectivity:** Connect components with draggable edges to define the workflow.
- **Dynamic Configuration:** A context-aware panel to configure selected nodes.
- **PDF-based Knowledge Base (RAG):** Upload PDF documents to serve as a knowledge source for the AI.
- **Real-time AI Chat:** An interactive modal to execute the built workflow and receive intelligent, context-aware answers from the AI.
- **100% Free to Run:** Utilizes the free tiers of Google Gemini for both embeddings and language generation.

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, React Flow, Tailwind CSS, Axios
- **Backend:** FastAPI (Python), Uvicorn
- **Database:** PostgreSQL
- **Vector Store:** ChromaDB
- **AI Services:**
  - **LLM:** Google Gemini (`gemini-1.5-pro-latest`)
  - **Embeddings:** Google Gemini (`models/embedding-001`)
- **Containerization:** Docker & Docker Compose

## 🏗️ Architecture

```mermaid
graph TD
    A[Frontend: React.js] -- API Request --> B[Backend: FastAPI];
    B -- Stores Metadata --> C[Database: PostgreSQL];
    B -- Stores/Retrieves Vectors --> D[Vector Store: ChromaDB];
    B -- Generates Text/Embeddings --> E[AI Service: Google Gemini];
    F[User] -- Interacts with --> A;
end
```

## 🚀 Setup and Installation

### Method 1: Docker (Recommended)

This is the easiest way to get the entire application running.

**Prerequisites:**
- Docker Desktop installed and running.
- A Git client.

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ravishrk124/ai-planet-assignment.git](https://github.com/Ravishrk124/ai-planet-assignment.git)
    cd ai-planet-assignment
    ```

2.  **Create the environment file:**
    In the `backend` folder, create a new file named `.env`. Copy the contents of `.env.example` (or the block below) into it and add your API keys.

    ```
    # backend/.env
    DATABASE_URL="postgresql://user:password@db:5432/dbname"
    OPENAI_API_KEY="sk-..." # Still needed for ChromaDB, but can be a dummy key
    GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
    ```

3.  **Build and run the containers:**
    From the root `ai-planet-assignment` directory, run:
    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**
    - The frontend will be available at **http://localhost:3000**.
    - The backend API will be available at **http://localhost:8000**.

### Method 2: Local Development

Follow these steps if you prefer to run the services locally without Docker.

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Make sure your .env file is configured for your local PostgreSQL
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
# Make sure you have Node.js and Yarn installed
yarn
yarn start
```

## 📖 Usage

1.  **Start the application** using the Docker or local setup instructions.
2.  **Add Nodes:** Click the component buttons in the left sidebar to add a `User Query`, `KnowledgeBase`, `LLM Engine`, and `Output` node to the canvas.
3.  **Upload a PDF:** Click the `KnowledgeBase` node. In the right-hand configuration panel, click "Upload PDF" and select a document.
4.  **Connect the Workflow:** Drag connections between the node handles to form a chain: `User Query` → `KnowledgeBase` → `LLM Engine` → `Output`.
5.  **Chat:** Click the green "Chat with Stack" button. In the popup, ask a specific question about the content of your PDF and click "Send".
6.  Receive the intelligent, context-aware answer from the AI.
