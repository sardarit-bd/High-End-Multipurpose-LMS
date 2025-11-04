export default function QuizSection({ quizzes, onOpen }) {
  return (
    <div>
      <h4 className="px-4 text-sm font-semibold text-gray-600 mb-1">Quiz</h4>
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          onClick={onOpen}
          className="cursor-pointer rounded-xl bg-white/70 hover:bg-white/90 p-3 transition"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <p className="font-medium text-sm">{quiz.title}</p>
          <p className="text-xs text-gray-500">{quiz.questions?.length} questions</p>
        </div>
      ))}
    </div>
  );
}
