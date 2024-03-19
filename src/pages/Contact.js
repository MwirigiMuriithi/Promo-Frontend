import React, { useState } from 'react';
import '../styles/Contact.css'; 
import Footer from '../components/Footer/Footer';
import BottomLinks from '../components/BottomLinks';
import contactImage from '../images/contact1.jpg'; 
import whatsappIcon from '../images/whatsapp-icon.png';

function ContactPage() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        window.open(`mailto:${emailAddress}?subject=Contact%20Us&body=${emailMessage}`);
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, message })
            });
            if (response.ok) {
                setUsername('');
                setMessage('');
                setMessageStatus('Message sent successfully!');
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessageStatus('Failed to send message.');
        }
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/254737235499?text=Hello%20from%20PromoPay!');
    };

    return (
        <>
            <section id="header">
                <div className="header-bar">
                    <div className="left-bar">
                        <p className='opener'>Have any questions or inquiries?</p>
                        <h1>Contact Us</h1>
                        <p>We're here to help!</p>
                    </div>
                    <div className="right-bar">
                        <img src={contactImage} alt="Contact Us" />
                    </div>
                </div>
            </section>
            <section id="email-form">
                <div className="contact-form-section">
                    <h2>Send an Email</h2>
                    <form onSubmit={handleEmailSubmit}>
                        <div className="form-group">
                            <label htmlFor="email-address">Your Email Address:</label>
                            <input type="email" id="email-address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-message">Your Message:</label>
                            <textarea id="email-message" value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} rows="5" required></textarea>
                        </div>
                        <button type="submit">Send Email</button>
                        <br></br>
                    </form>
                </div>
            </section>
            <section id="message-form">
                <div className="contact-form-section">
                    <h2>Leave a Message</h2>
                    <form onSubmit={handleMessageSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Your Name:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message:</label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>
                        </div>
                        <button type="submit">Send</button>
                        {messageStatus && (
    <p className={messageStatus === 'Message sent successfully!' ? 'success-message' : 'error-message'}>
        {messageStatus}
    </p>
)}
                    </form>
                </div>
            </section>
            <section id="whatsapp">
                <div className="whatsapp-button" onClick={handleWhatsApp}>
                    <img src={whatsappIcon} width="40px"  alt="WhatsApp Icon" />
                    <span>Message Us on WhatsApp</span>
                </div>
            </section>
            <BottomLinks />
            <Footer />
        </>
    );
}

export default ContactPage;

