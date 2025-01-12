import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <motion.div
            className="py-16 bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
                <form className="max-w-lg mx-auto space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="w-full px-4 py-2 border rounded-lg"
                    ></textarea>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg"
                    >
                        Send Message
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default Contact;