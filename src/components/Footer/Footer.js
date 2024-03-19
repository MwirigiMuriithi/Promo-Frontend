import React from 'react';
import '../Footer/Footer.css';

function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="copyright">
        <p>Disclaimer: By using PromoPay, you agree to our Terms of Service and Trust Policy.</p>
        <p>All Rights Reserved.</p>
        <p>&#169; {currentYear} Coder.Viner</p>
      </div>
    </div>
  );
}

export default Footer;

