# backend/orchestrator.py
import services

def execute_workflow(nodes, edges, user_query: str):
    print("--- Executing Intelligent Workflow ---")
    context = ""
    for node in nodes:
        if node.get('type') == 'knowledgeBase':
            try:
                # Find the most recently created collection in ChromaDB
                collections = services.chroma_client.list_collections()
                if not collections:
                    print("No knowledge base collections found.")
                    continue
                
                latest_collection = collections[-1]
                collection_name = latest_collection.name
                print(f"Querying KnowledgeBase with collection: {collection_name}")
                context = services.query_knowledge_base(collection_name, user_query)

            except Exception as e:
                print(f"Could not find or query a collection: {e}")

    print("Getting response from LLM...")
    final_answer = services.get_llm_response(user_query, context)
    print("--- Workflow Complete ---")
    return final_answer