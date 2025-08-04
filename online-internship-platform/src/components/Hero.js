import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-gradient text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to
            <span className="block text-yellow-300">Internship Success</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have secured their dream internships through our comprehensive assessment platform. 
            Get certified, get hired, get ahead.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Assessment
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">10,000+</div>
              <div className="text-orange-100">Students Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-orange-100">Companies Partnered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">95%</div>
              <div className="text-orange-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white opacity-15 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 opacity-10 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero; 