import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import '../styles/Dashboard.css';
import { useAuthContext } from '../hooks/useAuthContext';
import BottomLinks from '../components/BottomLinks';
import CommentSection from '../components/CommentSection';

function Dashboard() {
    const { user } = useAuthContext();
    const [userPoints, setUserPoints] = useState(0);
    const [userReferralCode, setUserReferralCode]= useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [withdrawalStatus, setWithdrawalStatus] = useState(null); // null: not requested, 'success': successful, 'error': failed
    const [adminMessages, setAdminMessages] = useState([]);


    useEffect(() => {
        if (user && !user.isAdmin) {
            fetchUserPoints();
            fetchLeaderboard();
            fetchAdminMessages(); 

            const intervalId = setInterval(() => {
                fetchUserPoints();
                fetchLeaderboard();
                fetchAdminMessages(); 
            }, 300000);

            return () => clearInterval(intervalId);
        }
    }, [user]);

    const fetchAdminMessages = async () => {
        try {
            const response = await fetch('/api/contact/admin-messages', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch admin messages');
            }
            const data = await response.json();
            setAdminMessages(data);
        } catch (error) {
            console.error('Error fetching admin messages:', error);
        }
    };

    const fetchUserPoints = async () => {
        try {
            const response = await fetch('/api/dashboard/userpoints', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user points');
            }
            const userData = await response.json();
            setUserPoints(userData.points || 0);
            setUserReferralCode(userData.referralCode || null);
        } catch (error) {
            console.error('Error fetching user points:', error);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch('/api/dashboard/leaderboard', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard');
            }
            const data = await response.json();
            const mappedLeaderboard = data.map(entry => ({
                username: entry.username,
                totalPoints: entry.points
            }));
            setLeaderboard(mappedLeaderboard);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    const handleWithdrawal = async () => {
        if (userPoints >= 500) {
            try {
                const response = await fetch('/api/dashboard/withdraw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        username: user.name,
                        points: userPoints,
                        timestamp: new Date().toISOString()
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to withdraw points');
                }
                setWithdrawalStatus('success');
                setUserPoints(0); // Reset userPoints after successful withdrawal
                setTimeout(() => {
                    setWithdrawalStatus(null);
                }, 21600000); // 6 hours in milliseconds
            } catch (error) {
                console.error('Error withdrawing points:', error);
                setWithdrawalStatus('error');
            }
        } else {
            setWithdrawalStatus('error');
        }
    };
    
    // Button element
    <button onClick={handleWithdrawal} className='withdrawbutton' disabled={withdrawalStatus === 'success' || withdrawalStatus === 'error'}>
        Withdraw Now
    </button>
    
    return (
        <>
            {user && !user.isAdmin && (
                <>
                   
                <section id="points">
                    <h3 className='dashboard'>Points</h3>
                    <h4> We are proud of you {user.name}!</h4>
                    <h5>Share your referral code relentlessly to acquire more points!</h5>
                    <p>Your points: {userPoints}</p>
                    {userReferralCode ? (
                        <p>Referral code: {userReferralCode}</p>
                    ) : (<>
                        <p> Pay now to get a referral code and get started!</p>
                        <p> Share your code to friends and family and earn.</p>
                        <h5>Your payment wasn't successful? Try Again!</h5>
                        <Link to="/sales" className='sales-button'>Get Referral Code</Link>
                        </>
                    )}
                    <h6>#One point = One Shilling 😊</h6>
                </section>
                    <section id="leaderboard">
                        <h3 className='dashboard'>Leaderboard</h3>
                        <h4>See the top earners of the Moment.</h4>
                        <h5>Refer relentlessly and tirelessly and you will be listed among the champions!</h5>
                        <h5>Aim to be a champion!</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Total <br></br>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.totalPoints}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </>
            )}

            <section id="withdraw">
                <h3 className='dashboard'>Withdraw</h3>
                <h5>Enjoy the fruits of your labor.</h5>
                <h4>Withdraw Now!</h4>
                <button onClick={handleWithdrawal} className='withdrawbutton' disabled={withdrawalStatus === 'success'}>Withdraw Now</button>
                {withdrawalStatus === 'success' && <p style={{ color: 'green' }}>Withdrawal request successful. It will be processed within 6 hours.</p>}
                {withdrawalStatus === 'error' && <p style={{ color: 'red' }}>Failed to withdraw points. You must have more than 500 points to withdraw.</p>}
            </section>
            <CommentSection />
            <section id="admin-messages">
    <h3 className='dashboard'>Admin Messages</h3>
    {adminMessages && adminMessages.length > 0 ? (
        <div className="admin-messages-container">
            {adminMessages.map((message) => (
                <div key={message._id} className="admin-message">
                    <p>{message.message}</p>
                    <p className="admin-message-timestamp">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    ) : (
        <p>You dont have any messages from admin, {user.name}.</p>
    )}
</section>


            <section id="support">
                <h3 className='dashboard'>Support</h3>
                <p>Get help and assistance from our support team.</p>
                <Link to="/contact" className="contact-button">Get Help</Link>
            </section>
            <BottomLinks/>
            <Footer />
        </>
    );
}

export default Dashboard;