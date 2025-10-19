"use client";

import { useEffect, useMemo, useState } from "react";

export default function GenderEqualityQuiz() {
    // ------------ Quiz Data (feel free to edit/expand) ------------
    const QUESTIONS = useMemo(
        () => [
            {
                id: 1,
                category: "Basics",
                question: "What does “gender equality” mean?",
                options: [
                    { text: "Men and women are exactly the same", correct: false, explain: "Gender equality means equal rights, responsibilities, and opportunities for all genders—not that everyone is identical." },
                    { text: "All genders have equal rights, opportunities, and respect", correct: true, explain: "Correct. Equality is about fairness in rights, opportunities, and treatment across genders." },
                    { text: "Only women receive additional benefits", correct: false, explain: "Targeted support can reduce inequality, but equality itself is about fairness for all genders." },
                    { text: "Only men can make decisions", correct: false, explain: "That would be the opposite of gender equality." }
                ]
            },
            {
                id: 2,
                category: "Workplace",
                question: "Which practice best supports gender equality at work?",
                options: [
                    { text: "Pay secrecy policies", correct: false, explain: "Pay secrecy can hide unfair pay gaps." },
                    { text: "Transparent pay bands and promotion criteria", correct: true, explain: "Transparency helps prevent bias and narrow unjust pay gaps." },
                    { text: "Assuming men should lead meetings", correct: false, explain: "Assumptions based on gender undermine equality." },
                    { text: "Scheduling meetings after-hours only", correct: false, explain: "This can disadvantage caregivers and reduce inclusion." }
                ]
            },
            {
                id: 3,
                category: "Everyday Life",
                question: "Which statement shows an inclusive mindset?",
                options: [
                    { text: "Household chores are women’s work", correct: false, explain: "Chores are responsibilities to be shared, not assigned by gender." },
                    { text: "Parents should support any child’s interest, regardless of gender", correct: true, explain: "Interests and talents aren’t limited by gender." },
                    { text: "Sports are mainly for boys", correct: false, explain: "All genders can enjoy and excel at sports." },
                    { text: "STEM is only for men", correct: false, explain: "All genders can thrive in STEM fields." }
                ]
            },
            {
                id: 4,
                category: "Education",
                question: "A school wants to improve gender equality. What helps most?",
                options: [
                    { text: "Discouraging girls from taking physics", correct: false, explain: "That reinforces stereotypes." },
                    { text: "Providing equal access to STEM clubs and mentorship for all", correct: true, explain: "Access + encouragement increases participation and closes gaps." },
                    { text: "Assigning class leaders by gender", correct: false, explain: "Leadership should be based on skill and interest, not gender." },
                    { text: "Separate grading scales by gender", correct: false, explain: "That would be discriminatory." }
                ]
            },
            {
                id: 5,
                category: "Policy",
                question: "Which policy supports equality for caregivers?",
                options: [
                    { text: "No parental leave for any gender", correct: false, explain: "Lack of leave harms families and workplace inclusion." },
                    { text: "Flexible work and equitable parental leave for all parents", correct: true, explain: "Equitable leave normalizes caregiving across genders." },
                    { text: "Only mothers get flexible hours", correct: false, explain: "That reinforces gendered expectations." },
                    { text: "Only fathers get paternity leave", correct: false, explain: "Leave should be equitable for all parents." }
                ]
            },
            {
                id: 6,
                category: "Respect",
                question: "What’s a respectful way to address a colleague’s gender?",
                options: [
                    { text: "Assume based on appearance", correct: false, explain: "Assumptions can be wrong and disrespectful." },
                    { text: "Politely ask their name and pronouns if relevant", correct: true, explain: "When relevant, asking respectfully helps avoid misgendering." },
                    { text: "Use nicknames without consent", correct: false, explain: "Use names people prefer." },
                    { text: "Avoid using any names", correct: false, explain: "Clear, respectful communication is best." }
                ]
            },
            {
                id: 7,
                category: "Leadership",
                question: "How can teams reduce bias in hiring and promotion?",
                options: [
                    { text: "Use structured interviews and competency rubrics", correct: true, explain: "Structure reduces subjective bias and improves fairness." },
                    { text: "Rely on gut feelings", correct: false, explain: "Gut feelings often reflect unconscious bias." },
                    { text: "Ask about family plans", correct: false, explain: "That’s invasive and can be discriminatory." },
                    { text: "Invite only men to final rounds", correct: false, explain: "That excludes qualified talent and violates equality." }
                ]
            },
            {
                id: 8,
                category: "Media",
                question: "What helps reduce gender stereotypes in media?",
                options: [
                    { text: "Show diverse roles and stories for all genders", correct: true, explain: "Representation broadens what audiences see as possible." },
                    { text: "Repeat the same gender roles", correct: false, explain: "Repetition cements stereotypes." },
                    { text: "Exclude non-binary characters", correct: false, explain: "Inclusion supports equality." },
                    { text: "Limit leadership roles to men", correct: false, explain: "Leadership is not gender-bound." }
                ]
            },
            {
                id: 9,
                category: "Sports",
                question: "Which action supports equal opportunity in sports?",
                options: [
                    { text: "Equal access to facilities, coaching, and funding", correct: true, explain: "Resources unlock participation and performance." },
                    { text: "Less funding for girls’ teams", correct: false, explain: "Unequal funding creates unequal outcomes." },
                    { text: "Restrict girls’ training times", correct: false, explain: "Restrictions reduce opportunity." },
                    { text: "Marketing only men’s games", correct: false, explain: "Visibility matters for all teams." }
                ]
            },
            {
                id: 10,
                category: "Allyship",
                question: "How can you act as an ally for gender equality?",
                options: [
                    { text: "Speak up against sexist comments and policies", correct: true, explain: "Constructive action helps change norms." },
                    { text: "Ignore discrimination if it’s subtle", correct: false, explain: "Small acts accumulate into big harms." },
                    { text: "Assume it’s not your place", correct: false, explain: "Allyship means using your voice to support fairness." },
                    { text: "Only support when it affects you directly", correct: false, explain: "Equality benefits everyone." }
                ]
            }
        ],
        []
    );

    // ------------ Helpers ------------
    const shuffle = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    // ------------ State ------------
    const [order, setOrder] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]); // {qid, picked, correct, explain}

    useEffect(() => {
        // randomize initial order
        setOrder(shuffle(QUESTIONS.map((_, i) => i)));
    }, [QUESTIONS]);

    // Current question
    const qIndex = order[current] ?? 0;
    const q = QUESTIONS[qIndex];

    // ------------ Handlers ------------
    const handleOption = (idx) => {
        if (locked) return;
        setSelected(idx);
    };

    const handleSubmit = () => {
        if (selected === null || locked) return;

        const picked = q.options[selected];
        const correct = !!picked?.correct;

        setLocked(true);
        setScore((s) => s + (correct ? 1 : 0));
        setAnswers((a) => [
            ...a,
            {
                qid: q.id,
                picked: picked?.text ?? "",
                correct,
                explain: picked?.explain ?? "",
                question: q.question,
                category: q.category
            }
        ]);
    };

    const nextQuestion = () => {
        setSelected(null);
        setLocked(false);
        setCurrent((c) => c + 1);
    };

    const restart = () => {
        setOrder(shuffle(QUESTIONS.map((_, i) => i)));
        setCurrent(0);
        setSelected(null);
        setLocked(false);
        setScore(0);
        setAnswers([]);
    };

    const copyResult = async () => {
        const pct = Math.round((score / QUESTIONS.length) * 100);
        const summary =
            `Gender Equality Quiz — Score: ${score}/${QUESTIONS.length} (${pct}%)\n` +
            answers
                .map(
                    (a, i) =>
                        `${i + 1}. ${a.question}\n   Your answer: ${a.picked}\n   ${a.correct ? "✅ Correct" : "❌ Not correct"} — ${a.explain}`
                )
                .join("\n");
        try {
            await navigator.clipboard.writeText(summary);
            alert("Result copied to clipboard!");
        } catch {
            alert("Could not copy. Please copy manually from the review section.");
        }
    };

    // ------------ Render ------------
    const total = QUESTIONS.length;
    const done = current >= total;

    return (
        <div className="min-h-[100vh] bg-gray-800 w-full flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white/70 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gender Equality Quiz
                        </h1>
                        <p className="text-sm text-gray-600">
                            Learn and test your knowledge about fairness, inclusion, and opportunity for all genders.
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="w-40">
                        <div className="text-xs text-gray-600 mb-1">
                            {Math.min(current, total)}/{total} completed
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 transition-all"
                                style={{ width: `${Math.min((current / total) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="my-6 border-t border-gray-100" />

                {/* Quiz Body */}
                {!done ? (
                    <>
                        <div className="mb-2 text-xs font-medium text-indigo-700 uppercase">
                            {q?.category}
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                            {q?.question}
                        </h2>

                        <div className="grid gap-3">
                            {q?.options.map((opt, idx) => {
                                const isPicked = selected === idx;
                                const showCorrect = locked && opt.correct;
                                const showWrong = locked && isPicked && !opt.correct;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOption(idx)}
                                        disabled={locked}
                                        className={[
                                            "text-left w-full rounded-xl border p-4 transition focus:outline-none",
                                            "hover:shadow-sm focus:ring-2 text-gray-900",
                                            isPicked && !locked ? "border-indigo-600 ring-2 ring-indigo-200" : "",
                                            showCorrect ? "border-emerald-600 bg-emerald-50" : "",
                                            showWrong ? "border-rose-600 bg-rose-50" : "",
                                            !isPicked && !locked ? "hover:border-gray-300" : "",
                                            "disabled:opacity-90 disabled:cursor-not-allowed"
                                        ].join(" ")}
                                        aria-pressed={isPicked}
                                        role="radio"
                                        aria-checked={isPicked}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="font-medium">{opt.text}</span>
                                            {showCorrect && <span className="text-emerald-700 text-sm">Correct</span>}
                                            {showWrong && <span className="text-rose-700 text-sm">Not quite</span>}
                                        </div>
                                        {locked && isPicked && (
                                            <p className="text-sm text-gray-700 mt-2">{opt.explain}</p>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Controls */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Question {current + 1} of {total}
                            </div>
                            {!locked ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={selected === null}
                                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Submit Answer
                                </button>
                            ) : (
                                <button
                                    onClick={nextQuestion}
                                    className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-black"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    // Results
                    <div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Your Results</h2>
                            <span className="text-sm text-gray-600">
                                Score: <b>{score}</b> / {total} ({Math.round((score / total) * 100)}%)
                            </span>
                        </div>

                        <div className="mt-4 grid gap-4">
                            {answers.map((a, i) => (
                                <div key={a.qid} className="rounded-xl border border-gray-200 p-4">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="text-xs font-medium text-indigo-700 uppercase">
                                            {a.category}
                                        </div>
                                        <div className={["text-xs font-semibold", a.correct ? "text-emerald-700" : "text-rose-700"].join(" ")}>
                                            {a.correct ? "✅ Correct" : "❌ Not correct"}
                                        </div>
                                    </div>
                                    <p className="mt-1 font-medium text-gray-900">{i + 1}. {a.question}</p>
                                    <p className="mt-1 text-sm text-gray-700">
                                        Your answer: <span className="font-medium">{a.picked}</span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-700">{a.explain}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                onClick={restart}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={copyResult}
                                className="px-5 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 font-medium"
                            >
                                Copy Result
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <p className="mt-6 text-xs text-gray-500">
                    Tip: You can customize questions, categories, and explanations in the <code>QUESTIONS</code> array.
                </p>
            </div>
        </div>
    );
}
