import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.div
            className="py-16 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-center">
                    Boutique Bliss is a premier women's fashion boutique dedicated to bringing the
                    latest trends and timeless styles to our customers. We pride ourselves on quality,
                    elegance, and exceptional service.
                </p>
            </div>
        </motion.div>
    );
};

export default About;