"use client";

const quizData = [
  { id: "01", user: "Louis", quiz: "About PHP", result: "80%", time: "10 Minutes", status: "Pass" },
  { id: "02", user: "Louis", quiz: "About PHP", result: "80%", time: "10 Minutes", status: "Fail" },
  { id: "03", user: "Louis", quiz: "About PHP", result: "80%", time: "10 Minutes", status: "Pass" },
  { id: "04", user: "Louis", quiz: "About PHP", result: "80%", time: "10 Minutes", status: "Fail" },
];

export default function QuizResults() {
  return (
    <div className="bg-white shadow-md rounded-lg px-4 p-6 md:p-12 text-[var(--color-text)]">
      <h2 className="text-xl font-bold mb-4 text-[var(--color-text)]">Quiz Results</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-background)] text-left">
              <th className="p-3 text-sm">Id</th>
              <th className="p-3 text-sm">User</th>
              <th className="p-3 text-sm">Quiz</th>
              <th className="p-3 text-sm">Result</th>
              <th className="p-3 text-sm">Time</th>
              <th className="p-3 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((q, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{q.id}</td>
                <td className="p-3">{q.user}</td>
                <td className="p-3">{q.quiz}</td>
                <td className="p-3">{q.result}</td>
                <td className="p-3">{q.time}</td>
                <td className="p-3">
                  {q.status === "Pass" ? (
                    <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded">
                      Pass
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Fail
                    </span>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid gap-4 md:hidden">
        {quizData.map((q, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-[var(--color-background)]">
            <p className="text-sm text-[var(--color-text)]"><strong>ID:</strong> {q.id}</p>
            <p className="text-sm text-[var(--color-text)]"><strong>User:</strong> {q.user}</p>
            <p className="text-sm text-[var(--color-text)]"><strong>Quiz:</strong> {q.quiz}</p>
            <p className="text-sm text-[var(--color-text)]"><strong>Result:</strong> {q.result}</p>
            <p className="text-sm text-[var(--color-text)]"><strong>Time:</strong> {q.time}</p>
            <p className="text-sm text-[var(--color-text)]">
              <strong>Status:</strong>{" "}
              {q.status === "Pass" ? (
                <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded">
                  Pass
                </span>
              ) : (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Fail
                </span>
              )}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
