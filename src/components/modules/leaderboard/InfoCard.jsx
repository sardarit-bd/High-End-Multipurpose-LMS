import React from 'react'
import { FaAward, FaFire } from 'react-icons/fa'

const InfoCard = () => {
    return (
        <section className="mt-8 bg-white rounded-[1rem] p-8 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-opacity-95">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold text-[#064E3B] mb-4 flex items-center">
                        <FaAward className="w-6 h-6 text-[#059669] mr-3" />
                        How Points Work
                    </h3>
                    <ul className="space-y-3 text-[#064E3B]">
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#059669] rounded-full"></div>
                            <span>Complete quizzes: <strong>+100 points</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
                            <span>Finish missions: <strong>+250 points</strong></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#0f9293] rounded-full"></div>
                            <span>Real-world activities: <strong>+500 points</strong></span>
                        </li>
                        {/* <li className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-[#FBBF24] rounded-full"></div>
                            <span>Daily login streak: <strong>+50 points/day</strong></span>
                        </li> */}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[#064E3B] mb-4 flex items-center">
                        <FaFire className="w-6 h-6 text-[#059669] mr-3" />
                        Climb the Ranks
                    </h3>
                    <p className="text-[#064E3B] mb-4 opacity-80">
                        Compete with learners worldwide, earn badges for achievements, and track your
                        progress towards becoming an SDG champion. Leaderboards update in real-time!
                    </p>
                    {/* <div className="flex space-x-3">
                        <button className="bg-gradient-to-r from-[#059669] to-[#2563EB] text-white px-6 py-2 rounded-xl font-semibold hover:from-[#047857] hover:to-[#1E40AF] transition-all duration-200 shadow-md">
                            Start Learning
                        </button>
                        <button className="border-2 border-[#059669] text-[#064E3B] px-6 py-2 rounded-xl font-semibold hover:bg-[#ECFDF5] transition-all duration-200">
                            View Badges
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default InfoCard