import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <motion.div
            className="relative bg-gradient-to-r from-darkPink to-palePink text-white text-center py-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto">
                <h1 className="text-5xl font-bold mb-4">Elevate Your Style</h1>
                <p className="text-lg mb-8 max-w-xl mx-auto">
                    Discover the finest in women's fashion. Shop our boutique collection today.
                </p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 bg-secondary text-black font-bold rounded-lg shadow-md"
                >
                    Shop Now
                </motion.button>
            </div>
        </motion.div>
    );
};

export default HeroSection;