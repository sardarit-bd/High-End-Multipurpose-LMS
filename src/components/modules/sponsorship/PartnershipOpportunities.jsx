import React from 'react'
import { FaCheck, FaGlobe } from 'react-icons/fa';

const PartnershipOpportunities = ({
  sponsorshipTypes,
  activeTab,
  setActiveTab,
  isHovered,
  setIsHovered,
  activeType,
}) => {

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaGlobe className="w-8 h-8 text-blue-500 mr-3" />
            Partnership Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect partnership model for your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sponsorshipTypes.map((type) => {
            const IconComponent = type.icon;
            const isActive = activeTab === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                onMouseEnter={() => setIsHovered(type.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform ${
                  isActive
                    ? `border-blue-500 bg-gradient-to-r ${type.color} text-white shadow-xl scale-105`
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-lg'
                } ${isHovered === type.id && !isActive ? 'scale-102' : ''}`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    isActive 
                      ? 'bg-white bg-opacity-20' 
                      : `bg-gradient-to-r ${type.color}`
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      isActive ? 'text-green-500' : 'text-white'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-sm opacity-90">{type.description}</p>
                  
                  {isActive && (
                    <div className="mt-4 space-y-2">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <FaCheck className="w-3 h-3 text-white opacity-90 flex-shrink-0" />
                          <span className="text-left">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Type Description */}
        {activeType && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <activeType.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeType.title}</h3>
                <p className="text-gray-700 text-lg">{activeType.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PartnershipOpportunities