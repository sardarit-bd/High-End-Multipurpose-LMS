"use client";

import { Trophy, Medal, Award } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Alice Johnson", points: 980, level: "Gold", avatar: "/images/ins1.jpg" },
  { id: 2, name: "Michael Smith", points: 870, level: "Silver", avatar: "/images/ins2.jpg" },
  { id: 3, name: "Sophia Brown", points: 850, level: "Silver", avatar: "/images/ins3.jpg" },
  { id: 4, name: "James Wilson", points: 720, level: "Bronze", avatar: "/images/ins4.jpg" },
  { id: 5, name: "Emma Davis", points: 690, level: "Bronze", avatar: "/images/ins4.jpg" },
];

export default function Leaderboard() {
  return (
    <div className="bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
        <Trophy className="text-[var(--color-accent)]" /> Leaderboard
      </h1>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {leaderboardData.slice(0, 3).map((player, index) => (
          <div
            key={player.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            {index === 0 && <Trophy className="text-[var(--color-primary)] w-8 h-8 mb-2" />}
            {index === 1 && <Medal className="text-[var(--color-secondary)] w-8 h-8 mb-2" />}
            {index === 2 && <Award className="text-[var(--color-accent)] w-8 h-8 mb-2" />}

            <img
              src={player.avatar}
              alt={player.name}
              className="w-16 h-16 rounded-full mb-3 border-4 border-[var(--color-primary)]"
            />
            <h2 className="font-semibold text-lg text-[var(--color-text)]">{player.name}</h2>
            <p className="text-sm text-gray-500">{player.level} Level</p>
            <p className="mt-2 text-xl font-bold text-[var(--color-primary)]">
              {player.points} pts
            </p>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--color-secondary)] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Player</th>
              <th className="py-3 px-4 text-left">Points</th>
              <th className="py-3 px-4 text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr
                key={player.id}
                className="border-b hover:bg-[var(--color-background)] transition"
              >
                <td className="py-3 px-4 font-semibold text-[var(--color-text)]">
                  #{index + 1}
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="text-[var(--color-text)]">{player.name}</span>
                </td>
                <td className="py-3 px-4 font-bold text-[var(--color-primary)]">
                  {player.points}
                </td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[var(--color-primary)]"
                      style={{ width: `${(player.points / 1000) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
