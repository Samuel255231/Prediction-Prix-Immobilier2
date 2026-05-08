import os
from dotenv import load_dotenv

load_dotenv()
###################################################################
###################### Ordre EXACT des features ####################
###################################################################
FEATURE_ORDER = [
    "superficie_m2", "nb_chambres", "nb_etages",
    "acces_route", "eau_electricite", "parking",
    "annee_construction",
    "localisation_periurbain", "localisation_rural", "localisation_urbain",
    "type_connexion_aucune", "type_connexion_fibre", "type_connexion_starlink",
    "type_sol_brut", "type_sol_carrelage", "type_sol_ciment",
    "etat_maison_a_renover", "etat_maison_bon", "etat_maison_neuf"
]

#################################################################### 
###################### PATH MODEL        ###########################
# ##################################################################

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "best_model_XGboost.pkl")

#################################################################### 
###################### PATH METRICS#################################
# ##################################################################

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
METRICS_PATH = os.path.join(BASE_DIR, "models", "metrics.pkl")

DATABASE_URL = os.getenv("DATABASE_URL")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM= os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"),30)
