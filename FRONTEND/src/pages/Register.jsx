import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import Navbar_home from '../components/Navbar_home';
import { Eye, EyeOff } from 'lucide-react';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '',confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            return setError('Les mots de passe ne correspondent pas');
        }
        setLoading(true);

        try {
            await register(
                formData.username, 
                formData.email, 
                formData.password
            );
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Navbar_home />
            <div className="auth-container">
                <h2>Inscription</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="votre_username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="exemple@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label>Mot de passe</label>
                        <input
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Entrez votre mot de passe"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={4}
                            autoComplete="off"
                        />
                        <button 
                            type="button" 
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
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
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div className="form-group" style={{ position: 'relative' }}>

                        <label>Confirmer le mot de passe</label>

                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirmez votre mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                    </div>

                    <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={loading}>
                        {loading ? 'Chargement...' : 'S\'inscrire'}
                    </button>
                </form>
                <p>
                    Deja un compte ? <Link to="/login">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;