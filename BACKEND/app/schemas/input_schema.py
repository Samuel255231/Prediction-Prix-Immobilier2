from pydantic import BaseModel


class Features(BaseModel):
    superficie_m2: float
    nb_chambres: int
    nb_etages: int
    acces_route: str        
    eau_electricite: str  
    parking:   str          
    annee_construction: int
    localisation: str
    type_connexion: str
    type_sol: str
    etat_maison: str

