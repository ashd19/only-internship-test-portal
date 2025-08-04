import React from 'react';

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic Assessment",
      price: "₹299",
      originalPrice: "₹499",
      features: [
        "35 Question Assessment",
        "60 Minutes Duration",
        "Instant Results",
        "Basic Report",
        "Email Certificate"
      ],
      popular: false
    },
    {
      name: "Premium Assessment",
      price: "₹499",
      originalPrice: "₹799",
      features: [
        "35 Question Assessment",
        "60 Minutes Duration",
        "Instant Results",
        "Detailed Report",
        "Email Certificate",
        "Priority Support",
        "Resume Review"
      ],
      popular: true
    },
    {
      name: "Enterprise Package",
      price: "₹999",
      originalPrice: "₹1499",
      features: [
        "35 Question Assessment",
        "60 Minutes Duration",
        "Instant Results",
        "Comprehensive Report",
        "Email Certificate",
        "Priority Support",
        "Resume Review",
        "Mock Interview",
        "Career Guidance"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your <span className="gradient-text">Assessment Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden costs. All plans include GST and instant access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white border-4 border-orange-400' 
                  : 'bg-white text-gray-800 border-2 border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-lg ${plan.popular ? 'text-orange-100' : 'text-gray-500'}`}>
                    + GST
                  </span>
                </div>
                <div className="text-center">
                  <span className={`line-through text-sm ${plan.popular ? 'text-orange-200' : 'text-gray-400'}`}>
                    {plan.originalPrice}
                  </span>
                  <span className={`ml-2 text-sm font-semibold ${plan.popular ? 'text-yellow-200' : 'text-green-600'}`}>
                    Save ₹{parseInt(plan.originalPrice.replace('₹', '')) - parseInt(plan.price.replace('₹', ''))}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg 
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-yellow-200' : 'text-green-500'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={plan.popular ? 'text-orange-50' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                plan.popular 
                  ? 'bg-white text-orange-600 hover:bg-gray-100' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us for enterprise solutions, bulk assessments, or custom integrations.
            </p>
            <button className="btn-outline">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 