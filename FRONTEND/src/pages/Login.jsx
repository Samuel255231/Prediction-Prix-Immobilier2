import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import Navbar_home from '../components/Navbar_home';
import { Eye, EyeOff } from 'lucide-react';

function Login() {

    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setLoading(true);

        try {

            await login(
                formData.identifier,
                formData.password
            );

            navigate('/dashboard');

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                'Erreur de connexion'
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="auth-page">

            <Navbar_home />

            <div className="auth-container">

                <h2>Connexion</h2>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email ou nom d'utilisateur</label>

                        <input
                            type="text"
                            name="identifier"
                            placeholder="Entrez votre email ou username"
                            value={formData.identifier}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>

                        <label>Mot de passe</label>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '38px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-3)'
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </button>

                </form>

                <p>
                    Pas de compte ?{' '}
                    <Link to="/register">
                        Inscrivez-vous
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;