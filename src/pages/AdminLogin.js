import { useState } from 'react';
import { useAdminLogin } from '../hooks/useAdminLogin';
//import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [admin, setAdmin] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useAdminLogin();
    //const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!admin || !password) return; // Skip form submission if fields are empty

        const success = await login(admin, password);
        if (success) {
            //navigate('/admin/dashboard');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="admin">Admin:</label>
                <input
                    type="text"
                    id="admin"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
                {error && <div className="error">Error: {error}</div>}
            </form>
        </div>
    );
};

export default AdminLogin;