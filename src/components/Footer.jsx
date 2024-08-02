import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-black py-4">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} BioTech Diagnostic Center. All Rights Reserved.</p>
        <p className="text-center text-sm mt-1">Designed and Developed by Adnan Ibrahim</p>
      </div>
    </footer>
  );
};

export default Footer;
