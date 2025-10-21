import React from 'react'

import {FaSyncAlt,FaChartLine} from 'react-icons/fa';

const Filters = ({ categories, activeCategory, setActiveCategory, timeframes, activeTimeframe, setActiveTimeframe, handleRefresh, loading }) => {
    return (
        <section className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                        <FaChartLine className="w-8 h-8 text-green-500 mr-3" />
                        Live Rankings
                    </h2>
                    <p className="text-gray-600">Track performance across different categories and timeframes</p>
                </div>

                <button
                    onClick={handleRefresh}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                >
                    <FaSyncAlt className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Category Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 shadow-lg'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">{category.name}</div>
                                    <div className="text-sm opacity-75">{category.description}</div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Timeframe Filters */}
            <div className="flex flex-wrap gap-3">
                {timeframes.map((timeframe) => {
                    const IconComponent = timeframe.icon;
                    const isActive = activeTimeframe === timeframe.id;

                    return (
                        <button
                            key={timeframe.id}
                            onClick={() => setActiveTimeframe(timeframe.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <IconComponent className="w-4 h-4" />
                            <span>{timeframe.name}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    )
}

export default Filters