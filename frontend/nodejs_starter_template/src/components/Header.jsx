import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../assets/logo.jpg';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-black text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo Image */}
                <div className="flex items-center space-x-2">
                    <img
                        src={logo} // Update with the correct path to your logo
                        alt="Boutique Bliss Logo"
                        className="w-12 h-12 rounded-full" // Adjust the size as needed
                    />
                    <h1 className="font-tangerine text-4xl font-normal">Ravishing Attire</h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/products" className="hover:underline">
                        Products
                    </Link>
                    <Link to="/about" className="hover:underline">
                        About
                    </Link>
                    <Link to="/contact" className="hover:underline">
                        Contact
                    </Link>
                </nav>

                {/* Hamburger Icon */}
                <button
                    className="block md:hidden focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </motion.div>
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <motion.div
                    className="md:hidden bg-primary text-white px-4 py-4 space-y-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Link
                        to="/"
                        className="block hover:underline"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="block hover:underline"
                        onClick={() => setMenuOpen(false)}
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        className="block hover:underline"
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="block hover:underline"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
