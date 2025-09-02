# backend/services.py
import os
import pypdf
import chromadb
import google.generativeai as genai
from dotenv import load_dotenv
# Import the specific embedding function utility from ChromaDB
from chromadb.utils import embedding_functions

load_dotenv()

# --- Initialize Clients ---
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
chroma_client = chromadb.Client()

# Create an embedding function using the Google Gemini API key
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=os.getenv("GEMINI_API_KEY"))
# --------------------------

def process_pdf_and_create_collection(file_path: str, collection_name: str):
    try:
        print(f"Processing PDF with Google Embeddings: {file_path}")
        reader = pypdf.PdfReader(file_path)
        text = "".join(page.extract_text() for page in reader.pages)
        chunks = [text[i:i + 1000] for i in range(0, len(text), 1000)]
        
        # ChromaDB will use the gemini_ef to automatically create the embeddings
        collection = chroma_client.create_collection(
            name=collection_name, 
            embedding_function=gemini_ef
        )
        collection.add(documents=chunks, ids=[f"chunk_{i}" for i in range(len(chunks))])
        
        print(f"Successfully created collection '{collection_name}'")
        return True
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return False

def query_knowledge_base(collection_name: str, query: str) -> str:
    try:
        # Get the collection and tell it to use the same embedding function for the query
        collection = chroma_client.get_collection(
            name=collection_name, 
            embedding_function=gemini_ef
        )
        results = collection.query(query_texts=[query], n_results=2)
        return " ".join(results['documents'][0])
    except Exception as e:
        print(f"Error querying collection '{collection_name}': {e}")
        return ""

def get_llm_response(user_query: str, context: str = "") -> str:
    prompt = user_query
    if context:
        prompt = f"Using the following context, please answer the question.\n\nContext:\n{context}\n\nQuestion:\n{user_query}"

    print(f"Sending prompt to Gemini: {prompt[:200]}...")
    
    try:
        model = genai.GenerativeModel('gemini-1.5-pro-latest')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "There was an error connecting to the Gemini API."