import { useState, useEffect } from 'react';
import { getPerformance } from '../services/performanceService';
import Navbar from '../components/Navbar';
import MetricCard from '../components/MetricCard';

function Performance() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await getPerformance();
                setMetrics(data);
            } catch (err) {
                setError(err.response?.data?.detail || 'Erreur de chargement');
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="performance-page">
            <Navbar />
            <div className="performance-content">
                <h1>Performance du Modele</h1>
                <h2>Metriques XGBoost</h2>
                {error && <div className="error">{error}</div>}
                
                {loading ? (
                    <p>Chargement...</p>
                ) : metrics ? (
                    <div className="metrics-grid">
                        <MetricCard title="R2 Score" value={metrics.r2} description="Variance expliquee" />
                        <MetricCard title="RMSE" value={metrics.rmse} description="Racine carree de l'erreur" />
                        <MetricCard title="MSE" value={metrics.mse} description="Erreur quadratique moyenne" />
                        <MetricCard title="MAE" value={metrics.mae} description="Erreur absolue moyenne" />
                    </div>
                ) : (
                    <p>Aucune donnee disponible</p>
                )}
            </div>
        </div>
    );
}

export default Performance;