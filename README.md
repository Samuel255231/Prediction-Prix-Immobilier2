# 🏠 Prédiction de Prix Immobilier

Application web complète permettant de prédire le prix d’un bien immobilier à Madagascar grâce à l’intelligence artificielle (Machine Learning - XGBoost).

---

# 🚀 Fonctionnalités

* 🔐 Authentification sécurisée avec JWT
* 📊 Prédiction de prix immobilier
* 🧾 Historique des prédictions par utilisateur
* 📈 Visualisation des performances du modèle
* 🐳 Conteneurisation avec Docker
* 🌐 API REST avec documentation Swagger

---

# 🛠️ Stack Technique

| Couche           | Technologie            |
| ---------------- | ---------------------- |
| Frontend         | React + Vite           |
| Backend          | FastAPI                |
| Base de données  | PostgreSQL             |
| Machine Learning | XGBoost + Scikit-learn |
| Authentification | JWT + bcrypt           |
| Conteneurisation | Docker                 |

---

# 📁 Architecture du Projet

## BACKEND (FastAPI + Machine Learning)

```bash
BACKEND/
├── .env                         # Variables d'environnement
├── requirements.txt             # Dépendances Python
├── Dockerfile                   # Configuration Docker backend
├── README.md                    # Documentation backend
│
├── app/
│   ├── __init__.py
│   ├── main.py                  # Point d'entrée FastAPI
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── router.py            # Router principal
│   │   ├── deps.py              # Dépendances JWT
│   │   │
│   │   └── routes/
│   │       ├── auth.py
│   │       ├── health.py
│   │       ├── history.py
│   │       ├── performance.py
│   │       └── predict.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   │
│   ├── middlewares/
│   │   └── logging_middleware.py
│   │
│   ├── models/
│   │   ├── user_model.py
│   │   └── prediction_model.py
│   │
│   ├── schemas/
│   │   ├── auth_schema.py
│   │   ├── history_schema.py
│   │   ├── input_schema.py
│   │   └── output_schema.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── evaluation_service.py
│   │   ├── history_service.py
│   │   ├── prediction_service.py
│   │   └── preprocessing_service.py
│   │
│   └── tests/
│       ├── test_auth.py
│       ├── test_predict.py
│       └── test_history.py
│
└── models/
    ├── best_model_XGboost.pkl
    └── metrics.pkl
```

---

## FRONTEND (React + Vite)

```bash
FRONTEND/
├── .env
├── package.json
├── package-lock.json
├── vite.config.js
├── Dockerfile                   # Configuration Docker frontend
├── nginx.conf                   # Configuration Nginx
├── index.html
├── eslint.config.js
├── README.md
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    │
    ├── api/
    │   └── api.js
    │
    ├── components/
    │   ├── HistoryTable.jsx
    │   ├── MetricCard.jsx
    │   ├── Navbar.jsx
    │   ├── Navbar_home.jsx
    │   ├── PredictionForm.jsx
    │   ├── PrivateRoute.jsx
    │   └── ResultCard.jsx
    │
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── History.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Performance.jsx
    │   └── Register.jsx
    │
    └── services/
        ├── authService.js
        ├── historyService.js
        ├── performanceService.js
        └── predictionService.js
```

---

# 🐳 Docker Architecture

```bash
Projet/
├── BACKEND/
├── FRONTEND/
└── docker-compose.yml
```

---

# ⚙️ Installation avec Docker

## 1. Cloner le projet

```bash
git clone https://github.com/OlivAndry/Prediction-Prix-Immobilier2.git
```

---

## 2. Aller dans le projet

```bash
cd Prediction-Prix-Immobilier2
```

---

## 3. Lancer les conteneurs Docker

```bash
docker-compose up --build
```

---

## 4. Lancer en arrière-plan

```bash
docker-compose up -d
```

---

## 5. Arrêter les conteneurs

```bash
docker-compose down
```

---

# 🌐 Accès Application

| Service      | URL                        |
| ------------ | -------------------------- |
| Frontend     | http://localhost:3000      |
| Backend API  | http://localhost:8000      |
| Swagger Docs | http://localhost:8000/docs |
| PostgreSQL   | localhost:5432             |

---

# 🔐 Authentification

## Register

```http
POST /auth/register
```

## Login

```http
POST /auth/login
```

Retourne un token JWT :

```http
Authorization: Bearer <token>
```

---

# 🤖 Modèle Machine Learning

* Algorithme : XGBoost
* Librairies : Scikit-learn, Pandas, NumPy
* Features utilisées :

  * Superficie
  * Nombre de chambres
  * Nombre d'étages
  * Parking
  * Eau / Électricité
  * Accès route
  * Année de construction
  * Localisation
  * Type de maison
  * État du bien

---

# 📈 Performance du Modèle

| Métrique | Valeur |
| -------- | ------ |
| R² Score | 0.9994 |
| RMSE     | 2.64   |
| MSE      | 6.9953 |
| MAE      | 1.7205 |

---

# 🌐 API Endpoints

| Méthode | Endpoint       | Description            |
| ------- | -------------- | ---------------------- |
| POST    | /auth/register | Inscription            |
| POST    | /auth/login    | Connexion              |
| POST    | /predict       | Prédiction de prix     |
| GET     | /history       | Historique utilisateur |
| GET     | /perf          | Performance du modèle  |
| GET     | /docs          | Documentation Swagger  |

---

# 🔒 Sécurité

* Hash des mots de passe avec bcrypt
* Authentification JWT
* Routes protégées
* Middleware de logging
* Gestion des erreurs FastAPI

---
