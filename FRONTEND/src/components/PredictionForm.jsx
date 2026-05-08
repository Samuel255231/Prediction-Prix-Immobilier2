import { useState } from 'react';

const OPTIONS = {
    acces_route: ['Oui', 'Non'],
    eau_electricite: ['Oui', 'Non'],
    parking: ['Oui', 'Non'],
    localisation: ['urbain', 'periurbain', 'rural'],
    type_connexion: ['starlink', 'fibre', 'aucune'],
    type_sol: ['carrelage', 'ciment', 'brut'],
    etat_maison: ['bon', 'neuf', 'a_renover'],
};

function PredictionForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        superficie_m2: '',
        nb_chambres: '',
        nb_etages: '',
        acces_route: '',
        eau_electricite: '',
        parking: '',
        annee_construction: '',
        localisation: '',
        type_connexion: '',
        type_sol: '',
        etat_maison: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            superficie_m2: parseFloat(formData.superficie_m2),
            nb_chambres: parseInt(formData.nb_chambres),
            nb_etages: parseInt(formData.nb_etages),
            annee_construction: parseInt(formData.annee_construction),
        });
    };

    return (
        <form className="prediction-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>Superficie (m²)</label>
                    <input type="number" name="superficie_m2" value={formData.superficie_m2} onChange={handleChange} required min="100" max="1000" />
                </div>
                <div className="form-group">
                    <label>Chambres</label>
                    <input type="number" name="nb_chambres" value={formData.nb_chambres} onChange={handleChange} required min="1" max="10" />
                </div>
                <div className="form-group">
                    <label>Etages</label>
                    <input type="number" name="nb_etages" value={formData.nb_etages} onChange={handleChange} required min="0" max="10" />
                </div>
                <div className="form-group">
                    <label>Annee construction</label>
                    <input type="number" name="annee_construction" value={formData.annee_construction} onChange={handleChange} required min="1900" max="2026" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Acces route</label>
                    <select name="acces_route" value={formData.acces_route} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.acces_route.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Eau / Electricite</label>
                    <select name="eau_electricite" value={formData.eau_electricite} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.eau_electricite.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Parking</label>
                    <select name="parking" value={formData.parking} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.parking.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Localisation</label>
                    <select name="localisation" value={formData.localisation} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.localisation.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Connexion</label>
                    <select name="type_connexion" value={formData.type_connexion} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.type_connexion.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Type sol</label>
                    <select name="type_sol" value={formData.type_sol} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.type_sol.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Etat maison</label>
                    <select name="etat_maison" value={formData.etat_maison} onChange={handleChange} required>
                        <option value=""></option>
                        {OPTIONS.etat_maison.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Prediction...' : 'Predire le prix'}
            </button>
        </form>
    );
}

export default PredictionForm;