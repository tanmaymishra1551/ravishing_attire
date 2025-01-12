import React from "react";
import { motion } from "framer-motion";
import floral from '../assets/products/floral-dress.jpg';
import summer from '../assets/products/summer-top.jpg';
import elegant from '../assets/products/elegant-skirt.jpg';

const Products = () => {
    const products = [
        { id: 1, name: "Elegant Dress", price: "$99", image: floral },
        { id: 2, name: "Casual Top", price: "$49", image: summer },
        { id: 3, name: "Stylish Skirt", price: "$79", image: elegant },
    ];

    return (
        <motion.div
            className="py-16 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            className="border rounded-lg overflow-hidden shadow-lg"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{product.name}</h2>
                                <p className="text-gray-600">{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Products;