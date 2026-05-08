import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';
import Navbar_home from '../components/Navbar_home';
import { getPerformance } from '../services/performanceService';
import { useState, useEffect } from 'react';

function Home() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        getPerformance().then(setMetrics).catch(() => {});
    }, []);

    return (
        <div className="home">
            <Navbar_home />

            <section className="system-description">
                <div className="description-content">
                    <h2>A propos de notre systeme</h2>
                    <p>
                        Notre plateforme utilise un modele de Machine Learning optimise pour predictions immobillieres.
                        Analysez les prix des maisons en fonction de multiples caracteristiques : surface, nombre de pieces,
                        localisation, etat du bien et bien plus encore. Accedez a un historique complet de vos predictions
                        et visualisez les metriques de performance en temps reel.
                    </p>
                    <div className="description-features">
                        <span> XGBoost</span>
                        <span> FastAPI</span>
                        <span> React</span>
                    </div>
                </div>
            </section>

            {metrics && (
                <section className="performance-section">
                    <div className="performance-header">
                        <h2>Performance de notre systeme</h2>
                    </div>
                    <div className="performance-grid">
                        <div className="metric-card">
                            <h3>R2 Score</h3>
                            <p className="metric-value">{metrics.r2?.toFixed(4)}</p>
                            <p className="metric-desc">Variance expliquee</p>
                        </div>
                        <div className="metric-card">
                            <h3>RMSE</h3>
                            <p className="metric-value">{metrics.rmse?.toFixed(4)}</p>
                            <p className="metric-desc">Erreur quadratique</p>
                        </div>
                        <div className="metric-card">
                            <h3>MSE</h3>
                            <p className="metric-value">{metrics.mse?.toFixed(4)}</p>
                            <p className="metric-desc">Erreur quadratique moyenne</p>
                        </div>
                        <div className="metric-card">
                            <h3>MAE</h3>
                            <p className="metric-value">{metrics.mae?.toFixed(4)}</p>
                            <p className="metric-desc">Erreur absolue</p>
                        </div>
                    </div>
                </section>
            )}

            <section className="features">
                <div className="feature-card">
                    <h3>Prediction Precise</h3>
                    <p>Utilisez notre modele XGBoost optimise pour des estimations fiables</p>
                </div>
                <div className="feature-card">
                    <h3>Historique Complet</h3>
                    <p>Consultez toutes vos predictions passees avec filtres avances</p>
                </div>
                <div className="feature-card">
                    <h3>Performance Modele</h3>
                    <p>Visualisez les metriques de performance du modele en temps reel</p>
                </div>
            </section>

            <footer className="footer">
                <p>API développée par @ Sahambala | Machine Learning</p>
            </footer>
        </div>
    );
}

export default Home;