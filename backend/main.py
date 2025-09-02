# backend/main.py
import uuid
import os
from fastapi import FastAPI, UploadFile, File, Depends
from pydantic import BaseModel
from typing import List, Dict, Any
import services
import models
from orchestrator import execute_workflow
from fastapi.middleware.cors import CORSMiddleware
from database import engine, get_db
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:3002"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class WorkflowExecutionRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    userQuery: str

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/v1/documents/upload")
async def upload_document(db: Session = Depends(get_db), file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    collection_name = f"collection_{uuid.uuid4()}"
    success = services.process_pdf_and_create_collection(file_path, collection_name)
    if not success:
        return {"error": "Failed to process PDF"}, 500
    db_document = models.Document(file_name=file.filename, vector_db_collection_id=collection_name)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return {"documentId": db_document.id, "fileName": db_document.file_name, "collectionName": collection_name}

@app.post("/api/v1/workflow/execute")
async def run_workflow(request: WorkflowExecutionRequest):
    final_answer = execute_workflow(request.nodes, request.edges, request.userQuery)
    return {"answer": final_answer}