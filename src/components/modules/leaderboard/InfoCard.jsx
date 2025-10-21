import React from 'react'
import { FaAward, FaFire } from 'react-icons/fa'

const InfoCard = () => {
    return (
        <section className="mt-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <FaAward className="w-6 h-6 text-green-500 mr-3" />
                        How Points Work
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Complete quizzes: <strong>+100 points</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Finish missions: <strong>+250 points</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Real-world activities: <strong>+500 points</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Daily login streak: <strong>+50 points/day</strong></span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <FaFire className="w-6 h-6 text-green-500 mr-3" />
                        Climb the Ranks
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Compete with learners worldwide, earn badges for achievements, and track your
                        progress towards becoming an SDG champion. Leaderboards update in real-time!
                    </p>
                    <div className="flex space-x-3">
                        <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                            Start Learning
                        </button>
                        <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:border-gray-400 transition-all duration-200">
                            View Badges
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoCard