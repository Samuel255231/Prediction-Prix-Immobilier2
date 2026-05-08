from sqlalchemy import Column, Integer, Float, DateTime, String, ForeignKey
from datetime import datetime, timezone
from app.core.database import Base

class PredictionHistory(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    prix_predit = Column(Float)
    superficie_m2 = Column(Float)
    nb_chambres = Column(Integer)
    nb_etages = Column(Integer)
    acces_route = Column(String)
    eau_electricite = Column(String)
    parking = Column(String)
    annee_construction = Column(Integer)

    localisation = Column(String)
    type_connexion = Column(String)
    type_sol = Column(String)
    etat_maison = Column(String)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))