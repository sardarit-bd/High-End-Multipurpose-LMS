"use client";
import React from "react";
import { Users, FileText, Clock } from "lucide-react";

const QuizResultsPage = () => {
  const quizInfo = {
    title: "Information About UI/UX Design Degree",
    questions: 25,
    duration: "30 Minutes",
    thumbnail: "/courses/uiux.jpg", // replace with your image
    totalParticipants: 30,
    scores: 3,
    averageTime: "00:00:55",
  };

  const results = [
    {
      id: 1,
      name: "Thompson Hicks",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      score: 75,
      attempts: 4,
      finishTime: "22 Aug 2025, 09:00 AM",
    },
    {
      id: 2,
      name: "Jennifer Tovar",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      score: 50,
      attempts: 3,
      finishTime: "10 Aug 2025, 09:15 AM",
    },
    {
      id: 3,
      name: "James Schulte",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      score: 60,
      attempts: 2,
      finishTime: "26 Jul 2025, 02:20 PM",
    },
    {
      id: 4,
      name: "Kristy Cardona",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg",
      score: 55,
      attempts: 2,
      finishTime: "12 Jul 2025, 11:40 AM",
    },
    {
      id: 5,
      name: "William Aragon",
      avatar: "https://randomuser.me/api/portraits/men/48.jpg",
      score: 45,
      attempts: 4,
      finishTime: "02 Jul 2025, 04:30 PM",
    },
    {
      id: 6,
      name: "Shirley Lis",
      avatar: "https://randomuser.me/api/portraits/women/58.jpg",
      score: 60,
      attempts: 1,
      finishTime: "25 Jun 2025, 08:10 AM",
    },
    {
      id: 7,
      name: "John Brewer",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      score: 45,
      attempts: 2,
      finishTime: "17 Jun 2025, 06:30 PM",
    },
    {
      id: 8,
      name: "Doris Hughes",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      score: 65,
      attempts: 3,
      finishTime: "04 Jun 2025, 05:00 PM",
    },
    {
      id: 9,
      name: "Sarah Martinez",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
      score: 70,
      attempts: 4,
      finishTime: "20 May 2025, 06:30 PM",
    },
    {
      id: 10,
      name: "Sarah Martinez",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      score: 40,
      attempts: 3,
      finishTime: "15 May 2025, 01:40 PM",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-[var(--color-text)]">
      {/* Quiz Header */}
      <div className="bg-white shadow-sm rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-gray-100">
        <div className="w-28 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={quizInfo.thumbnail}
            alt={quizInfo.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{quizInfo.title}</h2>
          <div className="text-sm text-gray-500 flex items-center gap-4 mt-2">
            <span>📝 {quizInfo.questions} Questions</span>
            <span>⏰ {quizInfo.duration}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center justify-between bg-pink-50 border border-pink-100 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500">Total Participants</p>
            <p className="text-2xl font-semibold mt-1">{quizInfo.totalParticipants}</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-pink-200 rounded-full text-pink-700">
            <Users size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500">Scores</p>
            <p className="text-2xl font-semibold mt-1">{quizInfo.scores}</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-purple-200 rounded-full text-purple-700">
            <FileText size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between bg-violet-50 border border-violet-100 rounded-lg p-4">
          <div>
            <p className="text-sm text-gray-500">Average Time</p>
            <p className="text-2xl font-semibold mt-1">{quizInfo.averageTime}</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-violet-200 rounded-full text-violet-700">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Attempts</th>
              <th className="py-3 px-4">Finish Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{r.name}</span>
                </td>
                <td className="py-3 px-4 text-gray-700">{r.score}</td>
                <td className="py-3 px-4 text-gray-700">{r.attempts}</td>
                <td className="py-3 px-4 text-gray-700">{r.finishTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center text-sm text-gray-500">
          <span>Page 1 of 2</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-100">
              ‹
            </button>
            <button className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white">
              1
            </button>
            <button className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-100">
              2
            </button>
            <button className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-100">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
