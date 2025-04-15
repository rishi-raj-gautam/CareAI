// This would be your main App.jsx or index.jsx file
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Calendar, FileText, Clock, Clipboard, ArrowRight, CheckCircle } from 'lucide-react';

function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to handle smooth scroll to sections
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false); // Close mobile menu after navigation
    };
    
    // Function to handle external page navigation with HashRouter
    const handleNavigation = (path) => {
        navigate(path);
    };
    
    // Animation variants (remaining code unchanged)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const featureCardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, duration: 0.5 }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { type: 'spring', stiffness: 400, damping: 10 }
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    const floatVariants = {
        initial: { y: 0 },
        float: {
            y: [-10, 10, -10],
            transition: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
            }
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                repeat: Infinity,
                duration: 2
            }
        }
    };

    const features = [
        {
            title: "Patient Management",
            description: "Create and maintain detailed patient profiles with complete medical history.",
            icon: <Clipboard className="h-6 w-6 text-blue-500" />
        },
        {
            title: "Real-time Vitals",
            description: "Monitor patient vitals in real-time with smartwatch integration.",
            icon: <Heart className="h-6 w-6 text-red-500" />
        },
        {
            title: "Smart Scheduling",
            description: "Efficiently manage appointments and reduce patient waiting times.",
            icon: <Calendar className="h-6 w-6 text-green-500" />
        },
        {
            title: "Digital Prescriptions",
            description: "Generate and send digital prescriptions directly to pharmacies.",
            icon: <FileText className="h-6 w-6 text-purple-500" />
        },
        {
            title: "AI Insights",
            description: "Get AI-powered insights to enhance patient care and diagnosis.",
            icon: <Activity className="h-6 w-6 text-blue-500" />
        },
        {
            title: "Paperless Clinic",
            description: "Go completely paperless with digital forms and e-signatures.",
            icon: <CheckCircle className="h-6 w-6 text-teal-500" />
        }
    ];

    const testimonials = [
        {
            name: "Dr. Sarah Johnson",
            role: "Family Physician",
            text: "Smart Doc has transformed my practice. I've reduced admin work by 70% and can focus more on patient care.",
            avatar: "SJ"
        },
        {
            name: "Dr. Michael Chen",
            role: "Pediatrician",
            text: "The real-time vitals monitoring has been a game-changer for my pediatric patients.",
            avatar: "MC"
        },
        {
            name: "Dr. Emily Patel",
            role: "Cardiologist",
            text: "The AI insights have helped me identify patterns I might have missed. Truly cutting-edge technology.",
            avatar: "EP"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm py-4 px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl mr-3">
                            SD
                        </div>
                        <span className="text-xl font-bold text-gray-800">Smart Doc</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="hidden md:flex items-center space-x-10"
                    >
                        <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-blue-600 transition-colors">Features</button>
                        <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</button>
                        <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition-colors">Contact</button>

                        <div className="flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                                onClick={() => handleNavigation('/login')}
                            >
                                Log In
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => handleNavigation('/signup')}
                            >
                                Sign Up
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.div
                        className="md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </motion.div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pb-4"
                    >
                        <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Features</button>
                        <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Testimonials</button>
                        <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Pricing</button>
                        <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 px-4 text-gray-600 hover:bg-gray-100">Contact</button>
                        <div className="mt-3 flex flex-col space-y-2 px-4">
                            <button 
                                className="py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                                onClick={() => handleNavigation('/login')}
                            >
                                Log In
                            </button>
                            <button 
                                className="py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => handleNavigation('/signup')}
                            >
                                Sign Up
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="py-12 px-6 md:py-20 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
                        >
                            The Smart Solution for Modern Medical Practices
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-xl text-gray-600 leading-relaxed"
                        >
                            Streamline your practice with Smart Doc, the all-in-one platform for patient management, real-time vitals monitoring, and paperless operations.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigation('/doctors')}
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Schedule Demo
                            </motion.button>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex items-center"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium border-2 border-white">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="ml-4 text-gray-600">Trusted by 500+ healthcare professionals</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="initial"
                        animate="float"
                        variants={floatVariants}
                        className="hidden lg:block"
                    >
                        <motion.div
                            animate="pulse"
                            variants={pulseVariants}
                            className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className="bg-blue-600 text-white py-4 px-6">
                                <div className="flex items-center">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">Patient Dashboard</h3>
                                        <p className="text-blue-100 text-sm">Real-time monitoring</p>
                                    </div>
                                    <Clock className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">Patient Vitals</h4>
                                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Live</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-gray-500 mb-1">Heart Rate</div>
                                            <div className="flex items-center">
                                                <Heart className="text-red-500 mr-2" />
                                                <span className="text-xl font-bold">75 BPM</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-xs font-medium text-gray-500 mb-1">Blood Pressure</div>
                                            <div className="flex items-center">
                                                <Activity className="text-blue-500 mr-2" />
                                                <span className="text-xl font-bold">120/80</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">Today's Appointments</h4>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-3">
                                                        {String.fromCharCode(64 + i)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">Patient {i}</div>
                                                        <div className="text-xs text-gray-500">Checkup</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {9 + i}:00 AM
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Powerful Features for Modern Healthcare</h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Smart Doc provides all the tools you need to run an efficient, paperless practice.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={featureCardVariants}
                            whileHover="hover"
                            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                        >
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 px-6 md:px-12 lg:px-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">Trusted by Healthcare Professionals</h2>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            See what medical practitioners are saying about Smart Doc
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white text-gray-800 rounded-xl p-6 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mr-4">
                                        {item.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">{item.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the plan that fits your practice
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            name: "Solo Practice",
                            price: "$99",
                            period: "per month",
                            description: "Perfect for individual doctors",
                            features: ["Patient management", "Appointment scheduling", "Basic reporting", "Email support"]
                        },
                        {
                            name: "Clinic",
                            price: "$249",
                            period: "per month",
                            description: "Ideal for small clinics",
                            features: ["Everything in Solo", "Multiple doctor accounts", "Advanced analytics", "Smartwatch integration", "Priority support"]
                        },
                        {
                            name: "Enterprise",
                            price: "Custom",
                            period: "",
                            description: "For larger medical facilities",
                            features: ["Everything in Clinic", "Custom integrations", "White-labeling", "Dedicated account manager", "24/7 support"]
                        }
                    ].map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={featureCardVariants}
                            whileHover="hover"
                            className={`bg-white rounded-xl shadow-sm p-6 border ${index === 1 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'}`}
                        >
                            {index === 1 && (
                                <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wide py-1 px-2 rounded-full inline-block mb-4">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                <span className="ml-1 text-gray-500">{plan.period}</span>
                            </div>
                            <p className="mt-2 text-gray-600">{plan.description}</p>

                            <ul className="mt-6 space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${index === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'} transition-colors`}
                            >
                                {index === 2 ? 'Contact Sales' : 'Get Started'}
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-16 px-6 md:px-12 lg:px-16 bg-gray-50">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl font-bold text-gray-800"
                        >
                            Ready to Transform Your Practice?
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
                        >
                            Join hundreds of healthcare providers who are already using Smart Doc to enhance patient care and streamline their operations.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigation('/signup')}
                                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sign Up Now
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                See Demo
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}

export default Home;