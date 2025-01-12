import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-4">&copy; 2025 Boutique Bliss. All rights reserved.</p>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">Facebook</a>
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;