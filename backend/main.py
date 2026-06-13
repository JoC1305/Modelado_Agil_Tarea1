from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

origins = [
    "https://modelado-agil-tarea1-363487501200.us-west1.run.app",
    "http://localhost:5173",
]

app = FastAPI(
    title="API de Tarea Multi-Cloud",
    description="Backend en AWS FastAPI conectado con Frontend en GCP Cloud Run",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PlatoCreate(BaseModel):
    id: str = Field(min_length=1)
    nombre: str = Field(min_length=1)
    descripcion: list[str] = Field(min_length=1)
    precio: str = Field(min_length=1)


class PlatoUpdate(BaseModel):
    nombre: str = Field(min_length=1)
    descripcion: list[str] = Field(min_length=1)
    precio: str = Field(min_length=1)


class Plato(BaseModel):
    id: str
    nombre: str
    descripcion: list[str]
    precio: str
    estado: Literal["disponible", "agotado"] = "disponible"


platos_db: list[dict] = [
    {
        "id": "rossonero",
        "nombre": "Il rossonero",
        "descripcion": [
            "Risotto alla Milanese con ossobuco",
            "Vino tinto Chianti Classico",
            "Tiramisú tradicional",
        ],
        "precio": "$25",
        "estado": "disponible",
    },
    {
        "id": "nerazzurro",
        "nombre": "Il nerazzurro",
        "descripcion": [
            "Risotto al nero di seppia",
            "Café espresso",
            "Panacotta con frutos rojos",
        ],
        "precio": "$25",
        "estado": "disponible",
    },
    {
        "id": "bianconero",
        "nombre": "La vecchia signora",
        "descripcion": [
            "Tajarin al tartufo bianco",
            "Barolo",
            "Bonet piemontese",
        ],
        "precio": "$25",
        "estado": "disponible",
    },
]


def _buscar_plato(plato_id: str) -> dict:
    for plato in platos_db:
        if plato["id"] == plato_id:
            return plato
    raise HTTPException(status_code=404, detail=f"Plato '{plato_id}' no encontrado")


@app.get("/")
def read_root():
    return {
        "status": "online",
        "provider": "Amazon Web Services (AWS)",
        "framework": "FastAPI",
    }


@app.get("/api/datos")
def get_datos():
    return {
        "mensaje": "¡Hola desde el backend en AWS!",
        "elementos": ["Paquete 1", "Paquete 2", "Paquete 3"],
        "cloud": "AWS App Runner",
    }


@app.get("/api/platos", response_model=list[Plato])
def obtener_platos():
    return platos_db


@app.post("/api/platos", response_model=Plato, status_code=201)
def crear_plato(plato_nuevo: PlatoCreate):
    if any(plato["id"] == plato_nuevo.id for plato in platos_db):
        raise HTTPException(status_code=409, detail=f"Ya existe un plato con id '{plato_nuevo.id}'")
    plato = {**plato_nuevo.model_dump(), "estado": "disponible"}
    platos_db.append(plato)
    return plato


@app.put("/api/platos/{plato_id}", response_model=Plato)
def editar_plato(plato_id: str, plato_actualizado: PlatoUpdate):
    plato = _buscar_plato(plato_id)
    plato["nombre"] = plato_actualizado.nombre
    plato["descripcion"] = plato_actualizado.descripcion
    plato["precio"] = plato_actualizado.precio
    return plato


@app.delete("/api/platos/{plato_id}")
def eliminar_plato(plato_id: str):
    plato = _buscar_plato(plato_id)
    platos_db.remove(plato)
    return {"mensaje": f"Plato '{plato_id}' eliminado correctamente"}


@app.patch("/api/platos/{plato_id}/estado", response_model=Plato)
def cambiar_estado_plato(plato_id: str):
    plato = _buscar_plato(plato_id)
    plato["estado"] = "agotado" if plato["estado"] == "disponible" else "disponible"
    return plato
