import { useState } from 'react';
import { useAdminSignup } from '../hooks/useAdminSignup'; 
import { useNavigate } from 'react-router-dom';

import '../styles/Signup.css'; 

const AdminSignup = () => {
    const [admin, setAdmin] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secretKey, setSecretKey] = useState(''); // Add state for secret key
    const { signup, error, isLoading } = useAdminSignup(); 
    const navigate = useNavigate();

    const [adminError, setAdminError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [secretKeyError, setSecretKeyError] = useState(''); // Add state for secret key error

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAdminError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setSecretKeyError(''); // Reset secret key error

        let isValid = true;

        if (admin.length < 4) { 
            setAdminError('Admin must be at least 4 characters long.'); 
            isValid = false;
        } else if (admin.length > 24) {
            setAdminError('Admin must not exceed 24 characters.');
            isValid = false;
        }

        // Add validation for secret key
        if (secretKey.length === 0) {
            setSecretKeyError('Secret key is required');
            isValid = false;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else if (password.length > 24) {
            setPasswordError('Password must not exceed 24 characters.');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        }

        if (isValid) {
            const success = await signup(admin, password, secretKey); 
            if (success) {
                //navigate('/admin-dashboard'); 
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Admin Signup</h2> 
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="admin">Admin:</label> 
                <input
                    type="text"
                    id="admin"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)} 
                    required
                />
                {adminError && <div className="error">{adminError}</div>} 

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {passwordError && <div className="error">{passwordError}</div>}

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}

                {/* Add input field for secret key */}
                <label htmlFor="secretKey">Secret Key:</label>
                <input
                    type="password"
                    id="secretKey"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                />
                {secretKeyError && <div className="error">{secretKeyError}</div>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {error && <div className="error">Error: {error}</div>}
            </form>
        </div>
    );
};

export default AdminSignup;

