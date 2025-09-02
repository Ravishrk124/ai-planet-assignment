# backend/models.py
from sqlalchemy import Column, Integer, String
# CHANGE: Removed the dot from this import
from database import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    vector_db_collection_id = Column(String, unique=True, index=True)