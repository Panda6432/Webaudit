// components/Footer.tsx
"use client";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Audit Tool. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;