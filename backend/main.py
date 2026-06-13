from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
origins = ["https://modelado-agil-tarea1-363487501200.us-west1.run.app",
           "http://localhost:5173"]
app = FastAPI(
    title="API de Tarea Multi-Cloud",
    description="Backend en AWS FastAPI conectado con Frontend en GCP Cloud Run",
    version="1.0.0"
)

# Configurar CORS para permitir que Cloud Run consulte la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],  # En producción se cambia por la URL exacta de Cloud Run
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "provider": "Amazon Web Services (AWS)", "framework": "FastAPI"}

@app.get("/api/datos")
def get_datos():
    return {
        "mensaje": "¡Hola desde el backend en AWS!",
        "elementos": ["Paquete 1", "Paquete 2", "Paquete 3"],
        "cloud": "AWS App Runner"
    }