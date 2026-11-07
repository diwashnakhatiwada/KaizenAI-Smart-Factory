# KaizenAI Smart Factory

KaizenAI is a smart factory monitoring dashboard for visualizing production, machine health, product quality, and operational alerts. The React frontend connects to a FastAPI backend and presents real-time factory data in an interactive web interface.

## Features

- Factory production and efficiency metrics
- Machine status, temperature, vibration, and production tracking
- Good and defective product monitoring
- Quality and defect-rate analytics
- Machine alerts and severity indicators
- Responsive dashboard with a production-floor overview
- FastAPI endpoints for dashboard data

## Tech Stack

### Frontend

- React 19
- Vite
- Axios
- Lucide React
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- CORS middleware

## Project Structure

```text
KaizenAI-Smart-Factory/
├── backend/
│   ├── main.py
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- Python 3.9 or newer

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/diwashnakhatiwada/KaizenAI-Smart-Factory.git
cd KaizenAI-Smart-Factory
```

### 2. Set up the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install fastapi uvicorn
```

Start the backend:

```bash
uvicorn main:app --reload
```

The API is available at `http://127.0.0.1:8000` and the interactive Swagger documentation is available at `http://127.0.0.1:8000/docs`.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend is available at `http://localhost:5173` by default.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Backend status |
| GET | `/api/hello` | Test API response |
| GET | `/api/factory` | Factory production summary |
| GET | `/api/machines` | Machine status and sensor data |
| GET | `/api/quality` | Product quality metrics |
| GET | `/api/alerts` | Active machine alerts |

## Available Frontend Commands

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

## Dashboard Data

The dashboard currently uses mock factory data provided by FastAPI. The backend endpoints return production totals, machine temperature and vibration readings, quality metrics, and alerts. This structure can later be connected to databases, IoT devices, sensors, or an AI analytics service.

## Future Improvements

- Connect machines through MQTT or WebSocket streams
- Add database persistence
- Add user authentication and role-based access
- Implement predictive maintenance using machine-learning models
- Add historical charts and date-range reporting
- Deploy frontend and backend to separate cloud services
- Add automated tests for frontend and backend components

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes.
4. Push the branch and open a pull request.

## License

Add a license file if you want to specify how the project may be used and distributed.
