import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection.jsx";
import ProductCard from "../components/ProductCard.jsx";
import floral from '../assets/products/floral-dress.jpg';
import summer from '../assets/products/summer-top.jpg';
import elegant from '../assets/products/elegant-skirt.jpg';
const Home = () => {
    return (
        <div>
            <HeroSection />
            <motion.section
                className="py-16 bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Collections</h2>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                        Explore our latest styles and trends, curated for every occasion.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <ProductCard title="Floral Dress" price="$49.99" imageUrl={floral} />
                        <ProductCard title="Summer Top" price="$29.99" imageUrl={summer} />
                        <ProductCard title="Elegant Skirt" price="$39.99" imageUrl={elegant} />
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
