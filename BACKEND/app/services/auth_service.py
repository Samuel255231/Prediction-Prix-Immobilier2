from app.models.user_model import User
from app.core.database import SessionLocal
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException


# ========================
# REGISTER
# ========================
def register_user(user_data):


    db = SessionLocal()

    try :

        # vérifier si existe
        existing_user = db.query(User).filter((User.username == user_data.username)| (User.email ==user_data.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username déjà existant")

        new_user = User(
            username=user_data.username,
            email=user_data.email,
            password=hash_password(user_data.password)
        )

        db.add(new_user)
        db.commit()
        return {"message": "Utilisateur créé avec succès"}
    finally :
        db.close()


# ========================
# LOGIN
# ========================
def login_user(user_data):

    db = SessionLocal()
    try:

        user = db.query(User).filter(User.username == user_data.username).first()

        if not user:
            raise HTTPException(status_code=400, detail="Utilisateur non trouvé")

        if not verify_password(user_data.password, user.password):
            raise HTTPException(status_code=400, detail="Mot de passe incorrect")

        token = create_access_token({
            "sub": str(user.id),
            "username": user.username,
            "role": user.role
        })

        return {
            "access_token": token,
            "token_type": "Bearer",
            "username": user.username,
            "role": user.role
        }
    finally:
        db.close()
