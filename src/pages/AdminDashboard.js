import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import '../styles/Dashboard.css';
import { useAuthContext } from '../hooks/useAuthContext';
import BlogWriter from '../components/BlogWriter';

function AdminDashboard() {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [sendMessageStatus, setSendMessageStatus] = useState(null);
    const [dailyStatistics, setDailyStatistics] = useState(null); // State for daily statistics
    const { user } = useAuthContext();

    useEffect(() => {
        if (user && user.isAdmin) {
            fetchWithdrawalRequests();
            fetchPayments();
            fetchUsers();
            fetchMessages();
            fetchDailyStatistics(); // Fetch daily statistics when component mounts
            const intervalId = setInterval(() => {
                fetchWithdrawalRequests();
                fetchPayments();
                fetchUsers();
                fetchMessages();
                fetchDailyStatistics(); // Fetch daily statistics on interval
            }, 300000); // Polling every 5 minutes
            return () => clearInterval(intervalId);
        }
    }, [user]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/admin/messages', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            setMessages(data.map(message => ({
                ...message,
                formattedTimestamp: new Date(message.createdAt).toLocaleString()
            })));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchWithdrawalRequests = async () => {
        try {
            const response = await fetch('/api/admin/withdrawal-requests', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch withdrawal requests');
            }
            const data = await response.json();
            setWithdrawalRequests(data.map(request => ({
                ...request,
                formattedTimestamp: new Date(request.timestamp).toLocaleString()
            })));
        } catch (error) {
            console.error('Error fetching withdrawal requests:', error);
        }
    };

    const fetchPayments = async () => {
        try {
            const response = await fetch('/api/admin/payments', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch payments');
            }
            const data = await response.json();
            setPayments(data.map(payment => ({
                ...payment,
                formattedTimestamp: new Date(payment.timestamp).toLocaleString()
            })));
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchDailyStatistics = async () => {
        try {
            const response = await fetch('/api/admin/daily-statistics', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch daily statistics');
            }
            const data = await response.json();
            setDailyStatistics(data);
        } catch (error) {
            console.error('Error fetching daily statistics:', error);
        }
    };

    const totalPayments = payments.reduce((total, payment) => total + payment.amount, 0);

    const totalEarnings = payments.reduce((total, payment) => total + (payment.amount - 100), 0);

    const handleDeleteWithdrawalRequest = async (id) => {
        try {
            await fetch(`/api/admin/withdrawal-requests/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            fetchWithdrawalRequests();
        } catch (error) {
            console.error('Error deleting withdrawal request:', error);
        }
    };

    const handleResetUserPoints = async (id) => {
        try {
            await fetch(`/api/admin/users/${id}/reset-points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ points: 0 }),
            });
            fetchUsers();
        } catch (error) {
            console.error('Error resetting user points:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/sendmessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    username: recipient,
                    message: messageContent,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            setRecipient('');
            setMessageContent('');
            setSendMessageStatus('Message sent successfully');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            setSendMessageStatus('Error sending message');
        }
    };

    return (
        <>
            <section id="totals">
                <h3 className='dashboard'>Summary</h3>
                <div style={{ color: '#006666' }}>
                    <p style={{ color: '#006666' }}>Total Payments: {totalPayments}</p>
                    <p style={{ color: '#006666' }}>Total Earnings: {totalEarnings}</p>
                    <p style={{ color: '#006666' }}>Total Users: {users.length}</p>
                </div>
            </section>

            <section id="daily-statistics">
                <h3 className='dashboard'>Daily Statistics</h3>
                {dailyStatistics ? (
                    <div style={{ color: '#006666' }}>
                        <p style={{ color: '#006666' }}>New Users Today: {dailyStatistics.usersGrowth}</p>
                        <p style={{ color: '#006666' }}>New Payments Today: {dailyStatistics.paymentsGrowth}</p>
                        <p style={{ color: '#006666' }}>Earnings Today: {dailyStatistics.earningsGrowth}</p>
                    </div>
                ) : (
                    <p>Loading daily statistics...</p>
                )}
            </section>

            <section id="withdrawal-requests">
                <h3 className='dashboard'>Withdrawal Requests</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Points</th>
                            <th>Timestamp</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawalRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request._id}</td>
                                <td>{request.username}</td>
                                <td>{request.points}</td>
                                <td>{request.formattedTimestamp}</td>
                                <td>
                                    <button onClick={() => handleDeleteWithdrawalRequest(request._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section id="users">
                <h3 className='dashboard'>Users Points</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Points</th>
                            <th>Phone Number</th>
                            <th>Referral Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.points}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.referralCode}</td>
                                <td>
                                    <button onClick={() => handleResetUserPoints(user._id)}>
                                        Reset Points
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section id="payments">
                <h3 className='dashboard'>Payments</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Referral Code</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment._id}</td>
                                <td>{payment.username}</td>
                                <td>{payment.phoneNumber}</td>
                                <td>{payment.referralCode}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.formattedTimestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </section>

            <section id="messages">
                <h3 className="dashboard">User Messages</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Message</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr key={message._id}>
                                <td>{message._id}</td>
                                <td>{message.username}</td>
                                <td>{message.message}</td>
                                <td>{message.formattedTimestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section id="compose-message">
                <h3 className="dashboard">Compose Message</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="recipient">Recipient Username:</label>
                        <input
                            type="text"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Send Message</button>
                    {sendMessageStatus && (
                        <div className={sendMessageStatus === 'Message sent successfully' ? 'success-message' : 'error-message'}>
                            {sendMessageStatus}
                        </div>
                    )}
                </form>
            </section>

            <BlogWriter/>
            <Footer />
        </>
    );
}

export default AdminDashboard;

