from fastapi import HTTPException
from app.schemas.output_schema import PredictionOutput
from app.models.prediction_model import PredictionHistory
from app.services.preprocessing_service import convert_binary,encode_localisation,encode_sol,encode_connexion,encode_etat
from app.core.database import SessionLocal
from app.core.config import MODEL_PATH, FEATURE_ORDER
from functools import lru_cache
import joblib
import pandas as pd


@lru_cache()
def get_model():
  return joblib.load(MODEL_PATH)

#######################################################################
################## Fonction de prédiction #############################
########################################################################

def predict_price(features,current_user):

    raw_data = features.model_dump()
    data_dict=raw_data.copy()

    try:

        data_dict["acces_route"] = convert_binary(raw_data["acces_route"])
        data_dict["eau_electricite"] = convert_binary(raw_data["eau_electricite"])
        data_dict["parking"] = convert_binary(raw_data["parking"])

        # encodage
        data_dict.update(encode_localisation(raw_data["localisation"]))
        data_dict.update(encode_connexion(raw_data["type_connexion"]))
        data_dict.update(encode_sol(raw_data["type_sol"]))
        data_dict.update(encode_etat(raw_data["etat_maison"]))

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    df = pd.DataFrame([data_dict])[FEATURE_ORDER]

    #Prediction
    model = get_model()
    prediction = model.predict(df)[0]
    
    prix_million = round(float(prediction),4)
    prix_reel = prix_million * 1_000_000
    

    # =========================
    # Sauvegarde en base
    # =========================
    db = SessionLocal()

    new_entry = PredictionHistory(
        superficie_m2=raw_data["superficie_m2"],
        nb_chambres=raw_data["nb_chambres"],
        nb_etages=raw_data["nb_etages"],

        acces_route=raw_data["acces_route"],
        eau_electricite=raw_data["eau_electricite"],
        parking=raw_data["parking"],

        annee_construction=raw_data["annee_construction"],

        localisation=raw_data["localisation"],
        type_connexion=raw_data["type_connexion"],
        type_sol=raw_data["type_sol"],
        etat_maison=raw_data["etat_maison"],

        prix_predit=round(float(prediction), 4),
        user_id=current_user.id
    )
    db.add(new_entry)
    db.commit()
    db.close()

    return PredictionOutput(
    prix_million_Ar=prix_million,
    prix_Ar=int(prix_reel)
)
    