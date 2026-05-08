#preprocessing_service.py

def convert_binary(value: str) -> int:
    """
    Convertit 'oui'/'non' en 1/0
    """
    if value.lower() == "oui":
        return 1
    elif value.lower() == "non":
        return 0
    else:
        raise ValueError("Valeur invalide : attendu 'oui' ou 'non'")
    


def encode_localisation(value: str):
    return {
        "localisation_periurbain": 1 if value == "periurbain" else 0,
        "localisation_rural": 1 if value == "rural" else 0,
        "localisation_urbain": 1 if value == "urbain" else 0,
    }


def encode_connexion(value: str):
    return {
        "type_connexion_aucune": 1 if value == "aucune" else 0,
        "type_connexion_fibre": 1 if value == "fibre" else 0,
        "type_connexion_starlink": 1 if value == "starlink" else 0,
    }



def encode_sol(value: str):
    return {
        "type_sol_brut": 1 if value == "brut" else 0,
        "type_sol_carrelage": 1 if value == "carrelage" else 0,
        "type_sol_ciment": 1 if value == "ciment" else 0,
    }

def encode_etat(value: str):
    return {
        "etat_maison_a_renover": 1 if value == "a_renover" else 0,
        "etat_maison_bon": 1 if value == "bon" else 0,
        "etat_maison_neuf": 1 if value == "neuf" else 0,
    }