import React, { useState } from 'react';
import '../styles/BottomLinks.css';
import Modal from './Modal'; // Assuming you have a Modal component
import { Link } from 'react-router-dom';

const BottomLinks = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const dummyContent = {
    'Return Policy': `
    <div>
      <h3>Return Policy</h3>
      <p>At PromoPay, we strive to provide the best possible experience for our users. If you are not entirely satisfied with your purchase or experience, we're here to help.</p>

      <h4>Refunds</h4>
      <p>We offer refunds on a case-by-case basis. If you believe you are entitled to a refund, please contact our support team with details of your purchase or experience.</p>

      <h4>Exchanges</h4>
      <p>We do not offer exchanges for our services. If you have any questions or concerns about your purchase or experience, please contact our support team for assistance.</p>

      <h4>Contact Us</h4>
      <p>If you have any questions about our Return Policy, please contact us by email at support@promopay.com or through our website's contact form.</p>
    </div>
  `
,
    'How it Works': `
      <div>
        <p>Here's how it Works!</p>
        <ol>
          <li>Sign Up</li>
          <li>Invest 300 Shillings and get your exclusive referral code</li>
          <li>Share your referral code with friends and acquaintances, and watch your earnings soar!</li>
          <li>Earn a cool 100 shillings for every new member you bring on board.</li>
        </ol>
      </div>
    `,
    'FAQs': `
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> What are We?
            <p>PromoPay is a free-to-use affiliate platform founded with the mission of bridging individuals with an online presence, like yourself, to harness their digital footprint and earn rewards! Our aim is to offer you a reliable source of supplementary income, enabling you to earn through referrals from the convenience of your home or during brief intervals between your school or work commitments. In a digital landscape where many earning opportunities lack legitimacy, we prioritize building trust with our users by consistently delivering top-notch services. Join us today and become a part of the revolution in online earning!</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Our Mission
            <p>At PromoPay, our mission is simple yet impactful: to redefine the landscape of online earning by offering a reliable and transparent platform for individuals to monetize their online presence. We are driven by the belief that everyone should have the opportunity to earn extra income from the comfort of their own home or during breaks from their daily routine. Our commitment to integrity and quality service sets us apart in an industry often plagued by distrust. By fostering a community of trust and reliability, we aim to empower our users to achieve their financial goals with confidence. Join us as we pave the way for a new era of online earning, built on trust, transparency, and opportunity.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Our Values
            <p>Transparency, Integrity, Innovation, Customer Focus</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Who can join PromoPay?
            <p>PromoPay is open to individuals from all backgrounds who have an online presence and are interested in earning rewards through referrals. Whether you're a social media influencer, blogger, content creator, or simply someone with an active online presence, you're welcome to join!</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Are there any requirements to join PromoPay?
            <p>To join PromoPay, you'll need a valid email address to create an account. Additionally, having an active presence on social media platforms or other online channels can enhance your earning potential.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> How do I refer others on PromoPay?
            <p>Referring others on PromoPay is simple! Once you've signed up for an account, you'll receive a unique referral link that you can share with your audience. When someone signs up using your referral link and meets the specified criteria, you'll earn rewards.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> What type of content can I share to promote PromoPay?
            <p>You can share your referral link and promotional content across various online platforms, including social media channels, blogs, websites, forums, and email newsletters. Be creative and authentic in your promotions to attract potential referrals.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Can I track the performance of my referral links on PromoPay?
            <p>Yes, PromoPay provides detailed analytics and reporting tools to track the performance of your referral links. You can monitor metrics such as clicks, sign-ups, conversions, and earnings to optimize your referral strategy.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Are there any restrictions on how I can promote PromoPay?
            <p>While we encourage creative promotion strategies, we expect users to adhere to our community guidelines and terms of service. Please refrain from engaging in spammy or unethical promotional practices that could harm the reputation of PromoPay.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> What support resources are available for PromoPay users?
            <p>PromoPay offers comprehensive support resources, including FAQs, tutorials, and a dedicated support team to assist users with any questions or issues they may encounter.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Can I participate in multiple referral campaigns on PromoPay?
            <p>Yes, PromoPay frequently offers new referral campaigns and promotions that users can participate in simultaneously. Keep an eye on our platform for updates on the latest campaigns and earning opportunities.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> Is my personal information secure with PromoPay?
            <p>Yes, PromoPay takes the privacy and security of user information seriously. We employ industry-standard security measures to safeguard your personal data and ensure compliance with data protection regulations.</p>
          </li>
          <li style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <strong style={{ color: '#006666' }}>Question:</strong> How can I contact PromoPay if I have further questions?
            <p>If you have any additional questions or need further assistance, you can reach out to our support team through the contact form on our website or via email. We're here to help!</p>
          </li>
        </ul>
      </div>
    `,

    'Terms of Service' : `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
    <p>Welcome to PromoPay</p>
    <p>If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern PromoPay’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please discontinue use of our website (hereinafter referred to as ‘Site’, or ‘Website’) is operated by PromoPay (hereinafter referred to as ‘us’, ‘we’, or ‘our’). The term ‘you’ refers to the user or viewer of our website.</p>
    <h3>Terms</h3>
    <p>By accessing our services on this site, you are agreeing to the Terms and Conditions laid out here. You also agree to comply with all applicable laws and regulations, and you are solely responsible for compliance with any local laws. This site is protected by applicable copyright law. We reserve the right to refuse service to anyone, without reason at any time.</p>
    <h3>Prohibited Uses</h3>
    <p>This site may not be used for any unlawful purposes. On-site Chat. The chat feature on the site may not be used for the following: a) Harassing other users or making them feel unwelcome. b) Toxicity, or saying things devised to provoke a reaction onto others. c) Advertising or spamming. This includes posting referral links. d) Asking other users or staff for money (begging). e) Sharing pornographic or deep web links. f) Harassing staff/support members. e) Sharing unlawful content.</p>
    <h3>Referral Link & Promo Codes</h3>
    <p>We reserve the right to revoke users’ referral link/promo code. This would only be done in the case of a user taking a code commonly used by another person, such as YouTubers or online celebrities.</p>
    <h3>Account Bans & Termination</h3>
    <p>We reserve the right to temporarily or permanently ban users at any time. Any activity we deem to be suspicious, or potentially fraudulent, would warrant an account freeze. Any of the following would warrant an account ban/freeze: a) Using multiple accounts or more than one account per household. b) Receiving offer chargebacks. c) Completing offers on another user’s account. d) Using any type of VPN, VPS or Emulator software. e) Using bots to complete offers f) Attempting to bot any statistical measure on the site, including but not limited to: clicks, referrals, tasks, social submissions.</p>
    <h3>Restricted access</h3>
    <h3>Offer holds</h3>
    <p>We reserve the right to temporarily hold offer credits at any time. This will occur automatically if a survey goes over a user’s credit limit. We reserve the right to hold these credits for up to 90 days after offer completion.</p>
    <h3>Virtual Currency</h3>
    <p>We provide and maintain the site on an “as is” and “as available” basis and we are liable only to provide our services with reasonable skill and care. We have not verified or reviewed External Sites and all use and access of External Sites is made at your own risk. “External Sites” means third party websites and online services to which the site links, including “tasks” on the Site. We give no other warranty in connection with the Website and to the maximum extent permitted by law, we exclude liability for: a) any loss or damage of any kind howsoever arising, including any direct, indirect, special, punitive or consequential loss whether or not that loss arises out of something of which we have been made aware; b) the accuracy, currency or validity of information and material contained within any User Content or the Website; c) any interruptions to the Website; d) any incorrect or inaccurate information on the Website; e) the infringement by any other person of any copyright or other intellectual property rights of any third party through any User Content or use of the Website; f) the availability, quality, content or nature of External Sites; g) any transaction taking place on External Sites; h) any amount or kind of loss or damage due to viruses or other malicious software that may infect a user’s computer equipment, software, data or other property caused by any other person accessing, using or downloading the Website or any User Content; and i) all representations, warranties, conditions and other terms and conditions which but for this notice would have effect. We do not warrant that the operation of the Website will be uninterrupted or error free. We will not be liable in any amount for failure to perform any obligation under these terms of use if that failure is caused by the occurrence of an event beyond its reasonable control. Except as provided above there are no other warranties, conditions or other terms and conditions, express or implied, statutory or otherwise, and all of those terms and conditions are hereby excluded to the maximum extent permitted by law. You agree not to use the Website in any way which is: a) unlawful; b) may give rise to civil or criminal liability for PromoPay; c) or, which might bring PromoPay into disrepute.</p>
</div>`,
    'Trust Policy': `
    <div>
      <h3>Introduction</h3>
      <p>PromoPay has designed this site in compliance with data protection regulations to assure you, the user, can use our services knowing the integrity of your personal information is secure. This Trust Policy describes the steps we take to maintain the integrity of your information and disclose both how and why we collect your information. By continuing to use our services, you are consenting to the collection and storage of your data as described in this Trust Policy.</p>

      <h3>Data Collection</h3>
      <p>When using our services, you may be required to share personal information about yourself, such as your email address, full name, home address etc. This information is collected for the sole purpose of providing you with suitable surveys and offers. A particular survey may have a determined audience required, so this information helps filter out irrelevant surveys which you would not have qualified for. We will never knowingly collect personal information from anyone under 13 years of age. We also collect non-personal information, including your IP address, browser type and cookies. This information allows us to provide you with a better experience and allows us to minimize fraud on our services.</p>

      <h3>Cookies and Local Storage</h3>
      <p>This site uses Cookies to identify your computer and allow us to associate requests from your computer with the relevant user. Local Storage provides useful functionality, such as remembering user preferences from previous browsing sessions. By using our services, you are agreeing with our use of Cookies and Local Storage outlined above. Cookies and Local Storage may be cleared or blocked at any time, however, the functionality of our services will be severely limited if you choose to block them.</p>

      <h3>Third Parties</h3>
      <p>The Site uses third-party partners such as offer walls and survey routers to provide you as a user with offers and surveys. The information that we share with these partners varies depending on the offer type. For regular ‘offers’, the only information we share is your unique ID generated by us to uniquely identify your account. For ‘surveys’, the only information we share is your unique ID, along with any information you have provided to us, which is passed to help the provider filter out irrelevant surveys. Any third-party services integrated into our site may collect information from you on their own website as well, and they have separate and independent privacy policies. We bear no responsibility or liability for their content and activities. If you are dissatisfied or concerned about any of these third-party privacy policies, please contact us, and we will be happy to investigate.</p>

      <h3>Sharing of Information</h3>
      <p>Our policy is to not share, sell, or rent your personal information to third parties for our benefit, however, there may be situations where we are required to share your personal details with third parties, such as relevant law enforcement agencies. If we believe that it is reasonably necessary to comply with law enforcement or other regulatory bodies, we may do so without your prior consent or notice. We may also share your personal information if we believe it is necessary to investigate, prevent, or act regarding situations that pose a threat to the security, rights, and assets of the company, or violations of our policies or terms of service. We may also share your personal information if necessary in cases of fraud, such as credit card fraud on offers. The disclosure of sensitive information to relevant organizations or authorities is at the sole discretion of the management of the company.</p>

      <h3>Security</h3>
      <p>We take your data protection and sensitivity very seriously. We employ industry-standard techniques to protect against unauthorized access to data about you that we store, including personal information. The personal information we collect about you is stored on secure servers, hosted by industry-leading hosting providers. We also maintain many security measures to attempt to protect against the loss, misuse, and alteration of the personal information within our control. However, no method of transmission or electronic storage is 100% secure. Therefore, we cannot guarantee the security of such information or be responsible for any damage that results from a breach in security. Furthermore, you should be aware that the Internet and other various networking communication media are not entirely secure, and your information may, therefore, be subject to interception or loss which is beyond our reasonable control. In conclusion, while we strive to protect your personal information, we cannot ensure or warrant the security of any personal information you transmit to us, and any transmission is done at your own risk. Accordingly, we assume no responsibility or liability for the disclosure of your personal information or other information due to errors in transmission, unauthorized third-party access, or other causes beyond our reasonable control.</p>

      <h3>For European Residents</h3>
      <p>If you are located in Europe, please be advised of the following required by the General Data Protection Regulation: The Company may provide the Service to Users located in Europe. In its interaction with European Users of the Service, the Company is a data controller such that we are the organization which decides the purposes for which and the ways in which any personal data that we have collected is used. You agree that we are entitled to obtain, use and process the information you provide to us to enable us to discharge the services. Further, you agree that we are allowed to store your data on servers located in the USA. Our lawful reason for processing your personal information will be “legitimate interests”. Under “legitimate interests” we can process your personal information if we have a genuine and legitimate reason and we are not harming any of your rights and interests. Pursuant to applicable law, PromoPay may disclose or transfer personal data and other information collected through the Application/Services to third parties. We will process your personal data in a lawful, fair, and transparent manner and only for the legitimate purpose of being able to provide the service. We will only request, process, and maintain personal information to the extent necessary to be able to provide the Service. We will keep in such form that, and only for the duration that, permits identification of data subjects for no longer than necessary. You may withdraw consent at any time and request that your personal information be erased. You may request a copy of all personal information maintained about you and request that it be rectified in the event any information is incorrect. The Company maintains all records in their entirety until and unless the User requests account deletion, at which time we will delete all personal information without undue delay. If you request that we erase your personal information, we will also be required to delete your account, and you will not be eligible to use the service unless you open another account.</p>

      <h3>Right to Withdraw Consent</h3>
      <p>You have the right to withdraw your consent at any time or to access and request that we rectify or remove your personal data from our system(s). You may exercise this right by submitting a written request to the contact information provided in Section (10).</p>

      <h3>Changes to this Trust Policy</h3>
      <p>We might update this Trust Policy from time to time, with or without prior notice, so you should bookmark this page and check it regularly. We will inform you by changing the date on this page noting when the policy was last updated. Continued use of the Site is used as your consent.</p>
    </div>
  `

  };
   

  const handleLinkClick = (title) => {
    setModalTitle(title);
    setModalContent(dummyContent[title]);
    setShowModal(true);
  };

  return (
    <section id='bottom-links'>
      <div className="footer-col-3">
        <h4>Useful Links</h4>
        <ul>
          <li><Link to="/signup" className="bottom-link">Join Affiliate</Link></li>
          <li><Link to="/blog" className="bottom-link">Blog Post</Link></li>
          <li><span className="bottom-link" onClick={() => handleLinkClick('Return Policy')}>Return Policy</span></li>
          <li><Link to="/about" className="bottom-link">About Us</Link></li>
        </ul>
        <hr />
      </div>
      <div className="footer-col-4">
        <h4>Learn</h4>
        <ul>
          <li><span className="bottom-link" onClick={() => handleLinkClick('How it Works')}>How it Works</span></li>
          <li><Link to="/signup" className="bottom-link">Signup</Link></li>
          <li><Link to="/login" className="bottom-link">Login</Link></li>
          <li><Link to="/sales" className="bottom-link">Sales</Link></li>
        </ul>
        <hr />
      </div>
      <div className="footer-col-4">
        <h4>Support</h4>
        <ul>
          <li><span className="bottom-link" onClick={() => handleLinkClick('FAQs')}>FAQs</span></li>
          <li><Link to="/contact" className="bottom-link">Contact Us</Link></li>
          <li><span className="bottom-link" onClick={() => handleLinkClick('Terms of Service')}>Terms of Service</span></li>
          <li><span className="bottom-link" onClick={() => handleLinkClick('Trust Policy')}>Trust Policy</span></li>
        </ul>
        <hr />
      </div>
      {showModal && <Modal title={modalTitle} content={modalContent} onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default BottomLinks;