import { useState } from 'react';

export const useSales = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postPayment = async (phoneNumber, referralCode, username) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, referralCode, username })
            });

            if (!response.ok) {
                throw new Error('Failed to post payment');
            }

            return response;
        } catch (error) {
            console.error('Error posting payment:', error);
            setError('Failed to post payment');
        } finally {
            setLoading(false);
        }
    };

    const confirmPayment = async (phoneNumber, referralCode, username, setStatusMessage) => {
        setLoading(true);
        setError(null);
        let confirmationMessage = '';
        let paymentConfirmed = false;
        
        try {
            let attempts = 0;
            const maxAttempts = 20;
            
            while (!paymentConfirmed && attempts < maxAttempts) {
                const response = await fetch('/confirm-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phoneNumber, referralCode, username })
                });

                if (response.ok) {
                    paymentConfirmed = true;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    attempts++;
                }
            }

            if (paymentConfirmed) {
                confirmationMessage = 'Payment confirmed successfully';
            } else {
                confirmationMessage = 'Failed to confirm payment after maximum attempts';
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            setError('Failed to confirm payment');
            confirmationMessage = 'Failed to confirm payment';
        } finally {
            setLoading(false);
            setStatusMessage(confirmationMessage); // Update status message based on payment confirmation status
            return { success: paymentConfirmed, message: confirmationMessage };
        }
    };

    return { loading, error, postPayment, confirmPayment };
};

