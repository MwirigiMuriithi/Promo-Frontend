import { Link } from 'react-router-dom';
import moneytree from '../images/moneytree.png'; // Import your image
import createAcount from '../images/createAccount.png';
import earning from '../images/earner-2.png';
import receive from '../images/receive-payment.jpg';
import '../styles/Home.css'; // Import your CSS file
import TypingAnimation from '../components/TypingAnimation';
import Footer from '../components/Footer/Footer';
import BottomLinks from '../components/BottomLinks';

function HomePage() {
    return (
<>               <section id="header">
                <div className="header-bar">
                    <div className="left-bar">
                        <p className='opener'>Discover a world of endless earning opportunities!</p>
                        <TypingAnimation />
                        <h1>Get Paid.</h1>
                        <p>Getting started is a breeze!</p>
                        <div className="action-buttons">
          <Link to="/signup" className="signup-button">Sign Up Now</Link>
          <Link to="/login" className="login-button">Login</Link>
        </div>
                    </div>
                    <div className="right-bar">
                        <img src={moneytree}  alt="Money Tree" />
                    </div>
                </div>
            </section>
            <section id="hero">
                <div className="heros">
                    <h3 className='paragraph'>Start earning right now!</h3>
                    <h6>PromoPay helps you make money online with just a click!</h6>
                    <div className="heros-images">
                        <div className="left-image">
                            <img src={createAcount} alt="Money Tree" />
                            <h3>Create a free account!</h3>
                            <p>Sign up for a PromoPay account today and get a referral code!</p>
                        </div>
                        <div className="middle-image">
                            <img src={earning} alt="Money Tree" />
                            <h3>Share and Earn</h3>
                            <p>Share your referral code with friends and family and earn!</p>
                        </div>
                        <div className="right-image">
                            <img src={receive} alt="Money Tree" />
                            <h3>Receive your Payment</h3>
                            <p>Withdraw at any time and receive your payments through M-Pesa</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="how">
                <div className="hows">
                    <h3>Earning made simple and payment instant!</h3>
                    <p>Dive into a world of limitless opportunities!<br />When you sign up, you open the door to a treasure trove of rewards.</p>
                    <h4>Here's how it Works!</h4>
                    <ol>
                        <li>Sign Up</li>
                        <li>Invest 300 Shillings and get your exclusive referral code</li>
                        <li>Share your referral code with friends and acquaintances, and watch your earnings soar!</li>
                        <li>Earn a cool 100 shillings for every new member you bring on board.</li>
                    </ol>
                    <h4>Get Started Today!</h4>
                </div>
            </section>
            <section id="sign-out">
                <div>
                    <h1>Ready to boost your income effortlessly?</h1>
                    <p>Join PromoPay today, where every connection brings you closer to financial success! 💸✨</p>
                    <div className="action-buttons">
          <Link to="/signup" className="signup-button">Sign Up Now</Link>
          <Link to="/login" className="login-button">Login</Link>
        </div>
                </div>
            </section>
            <BottomLinks/>
            <Footer/>
        </>
    );
}

export default HomePage;
