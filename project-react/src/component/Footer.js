import React from 'react';
import '../style/Footer.css';

function Footer() {
  return (
    <footer className="py-3 footer">
      <ul className="nav justify-content-center">
        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">About</a></li>
      </ul>
      <p className="text-center text-white mt-1">© 2022 Company, Inc</p>
    </footer>
  );
}

export default Footer;

