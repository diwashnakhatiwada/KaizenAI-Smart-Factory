from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="KaizenAI Smart Factory",
    description="IoT and AI Powered Smart Factory Monitoring System",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# HOME
# -----------------------------

@app.get("/")
def home():
    return {
        "project": "KaizenAI",
        "message": "Smart Factory Backend is Running",
        "status": "success"
    }


# -----------------------------
# TEST API
# -----------------------------

@app.get("/api/hello")
def hello():
    return {
        "message": "Hello from KaizenAI Smart Factory!"
    }


# -----------------------------
# FACTORY DATA
# -----------------------------

@app.get("/api/factory")
def factory_data():
    return {
        "production": 14997,
        "good_products": 14179,
        "defective_products": 818,
        "quality": 94.5,
        "efficiency": 88.0,
        "active_machines": 7,
        "total_machines": 8
    }


# -----------------------------
# MACHINE DATA
# -----------------------------

@app.get("/api/machines")
def machines():
    return [
        {
            "id": "M001",
            "name": "Production Machine 01",
            "status": "Running",
            "temperature": 68,
            "vibration": 2.1,
            "production": 2450
        },
        {
            "id": "M002",
            "name": "Production Machine 02",
            "status": "Running",
            "temperature": 71,
            "vibration": 2.8,
            "production": 2380
        },
        {
            "id": "M003",
            "name": "Production Machine 03",
            "status": "Warning",
            "temperature": 84,
            "vibration": 6.7,
            "production": 1850
        },
        {
            "id": "M004",
            "name": "Production Machine 04",
            "status": "Running",
            "temperature": 65,
            "vibration": 1.9,
            "production": 2760
        }
    ]


# -----------------------------
# QUALITY DATA
# -----------------------------

@app.get("/api/quality")
def quality():
    return {
        "total_production": 14997,
        "good_products": 14179,
        "defective_products": 818,
        "defect_rate": 5.45,
        "quality_rate": 94.55
    }


# -----------------------------
# ALERTS
# -----------------------------

@app.get("/api/alerts")
def alerts():
    return [
        {
            "machine": "M003",
            "type": "High Vibration",
            "severity": "High",
            "message": "Abnormal vibration detected."
        },
        {
            "machine": "M002",
            "type": "Temperature",
            "severity": "Medium",
            "message": "Machine temperature is increasing."
        }
    ]