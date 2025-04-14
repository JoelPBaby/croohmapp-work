import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex justify-between items-center min-h-screen bg-white p-0">
      {/* Image Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <div className="relative p-8 flex justify-end items-center h-auto bg-white">
          <img 
            src="/land.png" 
            alt="Organic shapes illustration" 
            className="w-[70vh] h-[89vh] max-w-[10000px] -mr-50 rounded-[30px] block"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <div className="p-16 bg-white h-[89vh] w-[60vh] border-2 border-[#e0e0e0] rounded-[30px] flex flex-col justify-center mr-[25vh]">
          <h1 className="text-[3rem] text-[#111] mb-6 font-extrabold">
            Productive Mind
          </h1>
          <p className="text-[1.1rem] text-[#666] leading-relaxed mb-8 max-w-full px-4">
            With only the features you need, Organic Mind is customized
            for individuals seeking a stress-free way to stay focused on
            their goals, projects, and tasks.
          </p>
          <button className="bg-[#FFD700] text-[#111] border-none py-4 px-8 rounded-lg text-base font-medium cursor-pointer hover:bg-[#FFC700] transition-colors duration-300 w-[calc(100%-2rem)] mx-4 mb-4">
            Get Started
          </button>
          <p className="text-center text-[0.9rem] text-[#666]">
            Already have an account?{' '}
            <a href="#" className="text-[#111] no-underline font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
