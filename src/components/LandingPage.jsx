import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center min-h-screen bg-white p-0"
    >
      {/* Image Section */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-1/2 flex flex-col justify-center"
      >
        <div className="relative p-8 flex justify-end items-center h-auto bg-white">
          <img 
            src="/land.png" 
            alt="Organic shapes illustration" 
            className="w-[79vh] h-[89vh] max-w-[10000px] -mr-50 rounded-[30px] block"
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-1/2 flex flex-col justify-center"
      >
        <div className="p-16 bg-white h-[89vh] w-[77vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[3rem] text-[#111] mb-6 font-extrabold"
          >
            Productive Mind
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[1.1rem] text-[#666] leading-relaxed mb-8 max-w-full px-4"
          >
            With only the features you need, Organic Mind is customized
            for individuals seeking a stress-free way to stay focused on
            their goals, projects, and tasks.
          </motion.p>
          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              backgroundColor: "#FFC700"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-[#FFD700] text-[#111] border-none py-4 px-8 rounded-lg text-base font-medium cursor-pointer transition-all duration-300 w-[calc(100%-2rem)] mx-4 mb-4"
          >
            Get Started
          </motion.button>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center text-[0.9rem] text-[#666]"
          >
            Already have an account?{' '}
            <a href="#" className="text-[#111] no-underline font-medium hover:underline">
              Sign in
            </a>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
