import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ title, price, imageUrl }) => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover sm:h-56 md:h-64" />
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{price}</p>
                <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg w-full">
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
