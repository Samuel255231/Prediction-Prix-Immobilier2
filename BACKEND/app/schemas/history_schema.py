from pydantic import BaseModel
from datetime import datetime

class HistoryItem(BaseModel):
    id: int
    prix: int
    superficie: float
    chambres: int
    nb_etages: int
    localisation: str
    connexion: str
    type_sol: str
    etat_maison: str
    date: datetime

class HistoryResponse(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int
    user: str
    data: list[HistoryItem]