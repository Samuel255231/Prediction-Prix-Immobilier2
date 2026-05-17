````md
# 🏠 API de Prédiction de Prix Immobilier

API développée avec **FastAPI** permettant de prédire le prix d’un bien immobilier en fonction de ses caractéristiques, avec gestion d’authentification, historique et performance du modèle.

---

## 🚀 Fonctionnalités de l'API BACKEND

- 🔐 Authentification sécurisée avec JWT
- 📊 Prédiction de prix immobilier (Machine Learning - XGBoost)
- 🧾 Historique des prédictions par utilisateur
- 📈 Consultation des performances du modèle
- 🐳 Conteneurisation avec Docker

---

## 📁 Architecture du projet

```bash
backend/
│
├── app/
│   ├── api/
│   │   ├── routes/            # Endpoints API
│   │   ├── deps.py            # Dépendances et authentification JWT
│   │   └── router.py          # Regroupement des routes API
│   │
│   ├── core/
│   │   ├── config.py          # Configuration globale de l'application
│   │   ├── database.py        # Connexion à PostgreSQL
│   │   └── security.py        # JWT, hash des mots de passe
│   │
│   ├── models/                # Modèles SQLAlchemy
│   ├── schemas/               # Schémas Pydantic
│   ├── services/              # Logique métier
│   │
│   └── main.py                # Point d'entrée principal FastAPI
│
├── models/                    # Modèle ML + métriques
├── data/                      # Données du projet
├── notebooks/                 # Analyse et entraînement ML
├── utils/                     # Fonctions utilitaires
│
├── Dockerfile                 # Configuration Docker du backend
├── docker-compose.yml         # Orchestration des conteneurs
├── .env                       # Variables d'environnement
├── requirements.txt           # Dépendances Python
├── .gitignore                 # Fichiers ignorés par Git
└── README.md                  # Documentation du projet
````

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/OlivAndry/Prediction-Prix-Immobilier2.git
cd backend
```

### 2. Créer un environnement virtuel

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Configuration du fichier `.env`

```bash
DATABASE_URL=postgresql://postgres:motdepasse@db:5432/immobilier_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 5. Lancer le serveur

```bash
uvicorn app.main:app --reload
```

---

## 🌐 Accès API

### API disponible sur :

```bash
http://127.0.0.1:8000
```

### Documentation Swagger :

```bash
http://127.0.0.1:8000/docs
```

---

## 🔐 Authentification

### Register

```bash
POST /auth/register
```

### Login

```bash
POST /auth/login
```

### Utilisation du token JWT

```bash
Authorization: Bearer <token>
```

---

## 🤖 Modèle Machine Learning

* 📌 Modèle utilisé : XGBoost
* 📁 Fichier modèle : `models/best_model_XGboost.pkl`
* ⚙️ Features automatiquement encodées avant prédiction

---

## 🛡️ Sécurité

* 🔒 Hash des mots de passe avec bcrypt
* 🔑 Authentification JWT
* 📜 Middleware de logging des requêtes
* ⚠️ Gestion globale des erreurs

```
```
