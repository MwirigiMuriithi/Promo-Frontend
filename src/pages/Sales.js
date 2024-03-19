import React, { useState } from 'react';
import { useSales } from '../hooks/useSales';
import { useAuthContext } from '../hooks/useAuthContext'; // Make sure to import useAuthContext
import { useNavigate } from 'react-router-dom';
import '../styles/Sales.css';

function Sales() {
    const { user } = useAuthContext(); // Assuming useAuthContext is properly defined
    const { loading, error, postPayment, confirmPayment } = useSales();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [referralCodeError, setReferralCodeError] = useState('');
    const navigate = useNavigate();

    
    const username = user ? (user.isAdmin ? user.name : user.name) : '';  // Check if user is not null before accessing its properties

    const handlePostPayment = async () => {
        if (!validatePhoneNumber(phoneNumber) || !validateReferralCode(referralCode)) return;
        
        setStatusMessage('Posting payment...');
        try {
            await postPayment(phoneNumber, referralCode, username);
            setStatusMessage('Processing payment...');
            const confirmResponse = await confirmPayment(phoneNumber, referralCode, username, setStatusMessage);
            if (confirmResponse.success) {
                setStatusMessage('Payment successful. Redirecting to dashboard...');
                navigate('/dashboard');
            } else {
                setStatusMessage('Failed to confirm payment. Please try again.');
            }
        } catch (error) {
            console.error('Error posting payment:', error);
            setStatusMessage('An error occurred while posting payment. Please try again.');
        }
    };
    

    const validatePhoneNumber = (number) => {
        if (number.length !== 10 || !/^[0]\d{9}$/.test(number)) {
            setPhoneNumberError('Phone number must be 10 digits and in the format 0*********');
            return false;
        }
        setPhoneNumberError('');
        return true;
    };

    const validateReferralCode = (code) => {
        if (!code) {
            setReferralCodeError('Referral code is required');
            return false;
        }
        setReferralCodeError('');
        return true;
    };

    return (
        <div className="sales-container">
            <h2>Ready to Start Earning?</h2>
            <p>Take the first step towards unlimited earnings with PromoPay! Initiate your payment now and unlock a world of opportunities.</p>

            {/* Prefilled "Pay 300 Shillings" button */}
            <button type="button" onClick={() => setPhoneNumber('')} className="prefilled">
                Pay 300 Shillings
            </button>

            <form>
                <label>M-Pesa Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input"
                />
                {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}

                <label>Referral Code:</label>
                <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="input"
                />
                {referralCodeError && <p className="error-message">{referralCodeError}</p>}

                <label>Username:</label>
                <input
                    type="text"
                    value={username} // Use the username variable here
                    readOnly // Make the input readonly to prevent user modification
                    className="input"
                />

                <button type="button" onClick={handlePostPayment} className="button" disabled={loading}>
                    {loading ? 'Processing...' : 'Initiate Payment'}
                </button>

                {statusMessage && <p className="status-message">{statusMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Sales;