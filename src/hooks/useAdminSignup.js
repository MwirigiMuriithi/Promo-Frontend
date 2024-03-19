import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAdminSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (admin, password, secretKey) => {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/admin/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ admin, password, secretKey })
        });
        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
            return false; // Return false on error
        }
        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('admin', JSON.stringify(json));
            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setLoading(false);
            return true; // Return true on successful signup
        }
    };

    return { signup, isLoading, error };
};
