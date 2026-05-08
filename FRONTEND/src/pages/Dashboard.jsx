import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictPrice } from '../services/predictionService';
import { logout, getCurrentUser } from '../services/authService';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';

function Dashboard() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePredict = async (formData) => {
        setError('');
        setLoading(true);
        try {
            const data = await predictPrice(formData);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur de prediction');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-content">
                <h1>Bienvenue, {getCurrentUser()}</h1>
                <h2>Predire le Prix</h2>
                {error && <div className="error">{error}</div>}
                
                <PredictionForm onSubmit={handlePredict} loading={loading} />
                
                {result && <ResultCard result={result} />}
            </div>
        </div>
    );
}

export default Dashboard;