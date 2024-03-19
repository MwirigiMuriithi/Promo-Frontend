import { Link } from 'react-router-dom';
import '../styles/About.css'; // Import your CSS file
import Footer from '../components/Footer/Footer';
import BottomLinks from '../components/BottomLinks';
import aboutImage from '../images/about3.jpg'; // Import your image
import whatsappIcon from '../images/whatsapp-icon.png';

function AboutPage() {
    const handleWhatsApp = () => {
        window.open('https://wa.me/254737235499?text=Hello%20from%20PromoPay!');
    };
    return (
        <>
            <section id="header">
                <div className="header-bar">
                    <div className="left-bar">
                        <p className='opener'>Discover our story and mission!</p>
                        <h1>Get to Know Us.</h1>
                        <p>Learn about who we are and what drives us.</p>
                        <div className="action-buttons">
                            <Link to="/signup" className="signup-button">Join Us</Link>
                        </div>
                    </div>
                    <div className="right-bar">
                        <img src={aboutImage} alt="About Us" />
                    </div>
                </div>
            </section>
            <section id="values">
                <div className="mission-section">
                    <h2>What are We?</h2>
                    <p>PromoPay is a free-to-use affiliate platform founded with the mission of bridging individuals with an online presence, like yourself, to harness their digital footprint and earn rewards! Our aim is to offer you a reliable source of supplementary income, enabling you to earn through referrals from the convenience of your home or during brief intervals between your school or work commitments. In a digital landscape where many earning opportunities lack legitimacy, we prioritize building trust with our users by consistently delivering top-notch services. Join us today and become a part of the revolution in online earning!</p>
                </div>
            </section>
            <section id="mission">
                <div className="mission-section">
                    <h2>Our Mission</h2>
                    <p>At PromoPay, our mission is simple yet impactful: to redefine the landscape of online earning by offering a reliable and transparent platform for individuals to monetize their online presence. We are driven by the belief that everyone should have the opportunity to earn extra income from the comfort of their own home or during breaks from their daily routine. Our commitment to integrity and quality service sets us apart in an industry often plagued by distrust. By fostering a community of trust and reliability, we aim to empower our users to achieve their financial goals with confidence. Join us as we pave the way for a new era of online earning, built on trust, transparency, and opportunity.</p>
                </div>
            </section>
            <section id="values">
                <div className="values-section">
                    <h2>Our Values</h2>
                    <ul>
                        <li>Transparency</li>
                        <li>Integrity</li>
                        <li>Innovation</li>
                        <li>Customer Focus</li>
                    </ul>
                </div>
            </section>
            <section id="contact">
                <div className="contact-section">
                    <h2>Contact Us</h2>
                    <p>Have any questions or inquiries? Feel free to reach out!</p>
                    <Link to="/contact" className="contact-button">Contact Us</Link>
                </div>
            </section>
            <BottomLinks />
            <section id="team">
                <div className="team-section">
                    <h5>This website was developed by Coder.Viner</h5>
                    <h5>Want Modern and Good Looking Websites with a touch of class in them?</h5>
                    <div className="whatsapp-button" onClick={handleWhatsApp}>
                    <img src={whatsappIcon} width="40px"  alt="WhatsApp Icon" />
                    <span>Message the Developer</span>
                </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default AboutPage;
