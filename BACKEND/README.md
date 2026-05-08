# 🏠API de Prédiction de Prix Immobilier

API développée avec **FastAPI** permettant de prédire le prix d’un bien immobilier en fonction de ses caractéristiques, avec gestion d’authentification, historique et performance du modèle.


##  Fonctionnalités de l'API BACKEND

- 🔐 Authentification (JWT)
- 📊 Prédiction de prix immobilier (Machine Learning - XGBoost)
- 🧾 Historique des prédictions par utilisateur
- 📈 Consultation des performances du modèle


##  Architecture du projet
```
backend/
│
├── app/
│   ├── api/
│   │   ├── routes/        # Endpoints API
│   │   ├── deps.py        # Dépendances (auth)
│   │   └── router.py      # Regroupement des routes
│
│   ├── core/
│   │   ├── config.py      # Configuration globale
│   │   ├── database.py    # Connexion DB
│   │   └── security.py    # JWT + Hash password
│
│   ├── models/            # Modèles SQLAlchemy
│   ├── schemas/           # Schémas Pydantic
│   ├── services/          # Logique métier
│
├── models/                # Modèle ML + métriques
├── data/                  # Données
├── notebooks/             # Analyse & entraînement
├── utils/
│
├── main.py                # Point d'entrée
├── .env                   # Variables d'environnement
├── requirements.txt
```

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Samuel255231/Predict_house_price.git
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

### 4. Configuration (.env)
```bash

DATABASE_URL=postgresql://postgres:motdepasse@localhost:5432/immobilier_db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 5. Lancer le serveur
```bash

uvicorn main:app --reload
```
#### API disponible sur :

http://127.0.0.1:8000

##### Documentation Swagger :
http://127.0.0.1:8000/docs

## Authentification

### Register
```bash
POST /auth/register
```
### Login 
```bash
POST /auth/login
```
 #### Retourne un token JWT à utiliser dans :   
 ```bash
 
 Authorization: Bearer <token>
 ```


## Modèle Machine Learning
##### Modèle : XGBoost
##### Fichier : models/best_model_XGboost.pkl
##### Features encodées automatiquement avant prédiction

## Sécurité
##### Hash des mots de passe : bcrypt
##### Authentification : JWT
##### Middleware de logging des requêtes
##### Gestion globale des erreurs

