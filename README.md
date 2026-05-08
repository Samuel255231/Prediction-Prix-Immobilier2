# Prédiction de Prix Immobilier

Application web complète permettant de prédire le prix d'un bien immobilier à Madagascar en utilisant l'intelligence artificielle (XGBoost).

## Fonctionnalités

- **Authentification** - Inscription et connexion avec JWT
- **Prédiction de prix** - Estimation précise basée sur les caractéristiques du bien
- **Historique** - Consultation des prédictions passées avec filtres
- **Performance du modèle** - Visualisation des métriques ML

## Stack Technique

| Couche | Technologie |
|-------|-------------|
| Frontend | React + Vite |
| Backend | FastAPI |
| Base de données | PostgreSQL |
| ML | XGBoost + Scikit-learn |
| Auth | JWT + bcrypt |

## Architecture

## BACKEND (FastAPI + model XGBoost)
```
BACKEND/
├── .env                      # Variables d'environnement
├── requirements.txt           # Dependencies Python
├── database.sql              # Script SQL (creation tables)
├── README.md                # Documentation backend
├── main.py                 # Point d'entree FastAPI
│
├── app/                    # Application principale
│   ├── __init__.py
│   ├── main.py             # Application FastAPI
│   │
│   ├── api/               # Routes API
│   │   ├── __init__.py
│   │   ├── router.py         # Router principal
│   │   ├── deps.py           # Dependencies
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py         # Authentification
│   │       ├── health.py      # Health check
│   │       ├── history.py      # Historique predictions
│   │       ├── performance.py # Performance modele
│   │       └── predict.py     # Prediction
│   │
│   ├── core/              # Configuration core
│   │   ├── __init__.py
│   │   ├── config.py        # Configuration
│   │   ├── database.py    # Base de donnees
│   │   └── security.py   # Securite (JWT)
│   │
│   ├── models/            # Models ML
│   │   ├── __init__.py
│   │   ├── user_model.py          # Modele utilisateur
│   │   └── prediction_model.py   # Modele prediction (XGBoost)
│   │
│   ├── schemas/           # Schemas Pydantic
│   │   ├── __init__.py
│   │   ├── auth_schema.py      # Schemas auth
│   │   ├── history_schema.py   # Schemas historique
│   │   ├── input_schema.py   # Schemas entree
│   │   └── output_schema.py  # Schemas sortie
│   │
│   └── services/         # Logique metier
│       ├── __init__.py
│       ├── auth_service.py          # Service auth
│       ├── evaluation_service.py # Evaluation modele
│       ├── history_service.py # Service historique
│       ├── prediction_service.py # Service prediction
│       └── preprocessing_service.py # Preprocessing donnees
│
└── models/                 # Modeles sauvegardes
    ├── best_model_XGboost.pkl    # Modele XGBoost
    └── metrics.pkl             # Metriques
```

## FRONTEND (React + Vite)
```
FRONTEND/
├── .env                      # Variables d'environnement
├── package.json              # Dependencies npm
├── package-lock.json        # Dependencies verouillees
├── vite.config.js           # Configuration Vite
├── index.html               # HTML principal
├── eslint.config.js         # Configuration ESLint
├── README.md               # Documentation frontend
│
└── src/                   # Code source
    ├── main.jsx            # Point d'entree React
    ├── App.jsx             # Composant principal
    ├── App.css            # Styles App
    ├── index.css         # Styles globaux
    │
    ├── api/              # Configuration API
    │   └── api.js       # Client HTTP
    │
    ├── components/       # Composants React
    │   ├── HistoryTable.jsx     # Tableau historique
    │   ├── MetricCard.jsx       # Carte metrique
    │   ├── Navbar.jsx          # Navbar principale
    │   ├── Navbar_home.jsx      # Navbar page Home
    │   ├── PredictionForm.jsx   # Formulaire prediction
    │   ├── PrivateRoute.jsx     # Route protegee
    │   └── ResultCard.jsx      # Carte resultat
    │
    ├── pages/           # Pages
    │   ├── Dashboard.jsx      # Tableau de bord
    │   ├── History.jsx         # Historique
    │   ├── Home.jsx            # Page d'accueil
    │   ├── Login.jsx           # Connexion
    │   ├── Performance.jsx    # Performance
    │   └── Register.jsx       # Inscription
    │
    └── services/        # Services API
        ├── authService.js        # Authentification
        ├── historyService.js     # Historique
        ├── performanceService.js # Performance
        └── predictionService.js  # Prediction
```

## Fichiers de Configuration
```
Racine:
  .gitignore           # Git ignore (/FRONTEND/node_modules/, /FRONTEND/.env, /backend/venv/, /backend/.env, /backend/database.sql)

BACKEND:
  BACKEND/.env         # DATABASE_URL, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES.

FRONTEND:
  FRONTEND/.env       # VITE_API_URL
```

## Installation

### Backend

```bash
cd BACKEND
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Configurer le fichier `.env`:
```
DATABASE_URL=postgresql://postgres:motdepasse@localhost:5432/prediction_db
SECRET_KEY=votre_cle_secrete
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Lancer le serveur:
```bash
uvicorn app.main:app --reload
```

API disponible sur: https://predict-prix-immobilier.onrender.com

### Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Application disponible sur: https://predict-prix.onrender.com

## Configuration CORS

Le backend est configuré pour accepter les requêtes depuis:
- http://localhost:5173 (Vite)
- http://localhost:3000
- https://predict-prix.onrender.com

## Modèle ML

- **Algorithm**: XGBoost
- **Features**: superficie, chambres, étage, accès route, eau/électricité, parking, année construction, localisation, type connexion, type sol, état maison
- **Métriques**:
  - R² Score: 0.9994
  - RMSE: 2.64
  - MSE: 6.9953
  - MAE: 1.7205

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /auth/register | Inscription |
| POST | /auth/login | Connexion |
| GET | /predict | Prédiction de prix |
| GET | /history | Historique des prédictions |
| GET | /perf | Performance du modèle |

