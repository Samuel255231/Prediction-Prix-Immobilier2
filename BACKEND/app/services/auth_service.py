import smtplib
from email.mime.text import MIMEText
from sqlalchemy import or_
from app.models.user_model import User
from app.core.database import SessionLocal
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException


# ========================
# REGISTER
# ========================
def register_user(user_data):

    db = SessionLocal()

    try:

        # vérifier si utilisateur existe déjà
        existing_user = db.query(User).filter(
            or_(
                User.username == user_data.username,
                User.email == user_data.email
            )
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Nom d'utilisateur ou email déjà utilisé"
            )

        # création utilisateur
        new_user = User(
            username=user_data.username,
            email=user_data.email,
            password=hash_password(user_data.password)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # création token JWT
        token = create_access_token({
            "sub": str(new_user.id),
            "username": new_user.username,
            "role": new_user.role
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
                "role": new_user.role
            }
        }

    finally:
        db.close()


# ========================
# LOGIN
# ========================
def login_user(user_data):

    db = SessionLocal()
    try:

        user = db.query(User).filter(
            or_(User.username == user_data.username,
                User.email == user_data.username
            )
        ).first()

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


def request_password_reset(email: str):

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return {"message": "Si l'email existe, un lien a été envoyé"}

        token = f"reset-{user.id}"
        link = f"http://localhost:3000/reset-password/{token}"

        print("RESET LINK:", link)
        # send_email(user.email, link
        return {"message": "Si l'email existe, un lien a été envoyé"}
    except Exception as e:
        print("ERROR RESET PASSWORD:", e)
        return {"message": "Erreur serveur"}

    finally:
        db.close()
        
def send_email(to_email: str, link: str):

    msg = MIMEText(f"Clique ici pour reset ton mot de passe: {link}")
    msg["Subject"] = "Reset Password"
    msg["From"] = "yourgmail@gmail.com"
    msg["To"] = to_email

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login("yourgmail@gmail.com", "APP_PASSWORD_ICI")
    server.send_message(msg)
    server.quit()