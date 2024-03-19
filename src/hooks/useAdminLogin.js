import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAdminLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (admin, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ admin, password })
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
                return false;
            }

            const json = await response.json();
            // Set isAdmin property to true for admin user
            const adminUser = { ...json, isAdmin: true };
            localStorage.setItem('admin', JSON.stringify(adminUser));
            dispatch({ type: 'LOGIN', payload: adminUser });

            return true;
        } catch (error) {
            setError('An unexpected error occurred.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, isLoading, error };
};
