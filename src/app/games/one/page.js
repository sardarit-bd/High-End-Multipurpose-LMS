"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * SDG Trivia Challenge – React Single-File Component (JSX version)
 * -------------------------------------------------
 * • Drop this file into your Next.js/React project and import <SDGTrivia />
 * • No external deps. Uses localStorage for a simple leaderboard
 * • Fully responsive; keyboard (1–4, Enter); lifelines (50/50 & Hint)
 */

export default function SDGTrivia() {
  /* ------------------------------ Question Bank ------------------------------ */
  const BANK = useMemo(
    () => [
      { sdg: 1, icon: "🚫💸", question: "SDG 1 aims to end poverty in all its forms. By which year was 'extreme poverty' originally targeted to be eradicated?", options: ["2030", "2025", "2050", "2020"], answer: 0, hint: "Same horizon as the Agenda itself." },
      { sdg: 2, icon: "🌾", question: "SDG 2 focuses on 'Zero Hunger'. Which sector is most directly targeted to improve food security?", options: ["Aerospace", "Agriculture", "Tourism", "Automotive"], answer: 1, hint: "Think farms, not flights." },
      { sdg: 3, icon: "🩺", question: "Which of the following aligns with SDG 3 (Good Health and Well-being)?", options: ["Reduce maternal mortality", "Increase fossil-fuel subsidies", "Lower vaccination coverage", "Promote tobacco use"], answer: 0, hint: "Think better health outcomes." },
      { sdg: 4, icon: "📚", question: "SDG 4 advocates 'Quality Education'. A core target is ensuring what by 2030?", options: ["Free university for all", "Free, equitable primary & secondary education", "No homework worldwide", "VR in every classroom"], answer: 1, hint: "Primary + secondary focus." },
      { sdg: 5, icon: "⚖️", question: "SDG 5 promotes gender equality. Which policy supports this goal?", options: ["Restrict women's land rights", "Equal pay for equal work", "Ban girls from STEM", "Reduce maternity leave"], answer: 1, hint: "Fair wages." },
      { sdg: 6, icon: "💧", question: "SDG 6 focuses on clean water and sanitation. Which metric is central?", options: ["Access to safe drinking water", "Number of swimming pools", "Ocean shipping routes", "Rainfall on weekends"], answer: 0, hint: "Water you can safely drink." },
      { sdg: 7, icon: "⚡", question: "SDG 7 seeks affordable and clean energy. Which is NOT a clean energy source?", options: ["Solar", "Wind", "Coal", "Hydro"], answer: 2, hint: "Fossil fuel." },
      { sdg: 8, icon: "💼", question: "SDG 8 is about decent work & economic growth. Which action aligns?", options: ["Eliminate workplace safety standards", "Promote youth employment", "Increase forced labor", "Ban entrepreneurship"], answer: 1, hint: "Opportunities for young people." },
      { sdg: 9, icon: "🏗️", question: "SDG 9 focuses on industry, innovation, and infrastructure. Which investment best fits?", options: ["Resilient transport networks", "Crumbling bridges", "Outdated dial-up internet", "Paper-only records"], answer: 0, hint: "Think resilient." },
      { sdg: 10, icon: "↔️", question: "SDG 10 targets reduced inequalities. Which step supports it?", options: ["Inclusive policies for marginalized groups", "Discriminatory hiring", "Unequal access to services", "Segregated schools"], answer: 0, hint: "Inclusion." },
      { sdg: 11, icon: "🏙️", question: "SDG 11 seeks sustainable cities. What is a relevant indicator?", options: ["Access to safe, affordable housing", "Number of neon signs", "Height of skyscrapers", "Amount of traffic jams only"], answer: 0, hint: "Shelter for all." },
      { sdg: 12, icon: "♻️", question: "SDG 12 promotes responsible consumption. Which behavior aligns?", options: ["Waste reduction & recycling", "Single-use growth", "Planned obsolescence", "Toxic dumping"], answer: 0, hint: "Reduce, reuse…" },
      { sdg: 13, icon: "🌍🔥", question: "SDG 13 urges climate action. Which policy directly supports it?", options: ["Carbon pricing & emission cuts", "Subsidizing coal expansion", "Ignoring climate risks", "Deforestation incentives"], answer: 0, hint: "Curb emissions." },
      { sdg: 14, icon: "🐟", question: "SDG 14 is 'Life Below Water'. Which action helps?", options: ["Reduce plastic marine pollution", "Increase ocean acidification", "Overfishing subsidies", "Dumping waste into seas"], answer: 0, hint: "Less plastic." },
      { sdg: 15, icon: "🌳", question: "SDG 15 is 'Life on Land'. Which is aligned?", options: ["Restore degraded ecosystems", "Accelerate deforestation", "Poaching incentives", "Soil erosion increase"], answer: 0, hint: "Bring nature back." },
      { sdg: 16, icon: "🕊️", question: "SDG 16 promotes peace, justice, and strong institutions. A key element is…", options: ["Rule of law and access to justice", "Arbitrary detention", "Corruption growth", "Violence escalation"], answer: 0, hint: "Justice matters." },
      { sdg: 17, icon: "🤝", question: "SDG 17 is about partnerships. Which idea fits best?", options: ["Multi-stakeholder collaboration", "Isolation from global trade", "Data hoarding", "Cutting development finance"], answer: 0, hint: "Work together." },
      { sdg: 7, icon: "⚡", question: "Which phrase best summarizes SDG 7?", options: ["Affordable & Clean Energy", "Infinite Energy for Free", "Only Nuclear Energy", "Ban Energy Use"], answer: 0, hint: "Two adjectives in the name." },
      { sdg: 4, icon: "📚", question: "Which barrier most directly blocks SDG 4?", options: ["Lack of qualified teachers", "High smartphone prices", "Short summer holidays", "Too many sports"], answer: 0, hint: "Human resources in schools." },
      { sdg: 6, icon: "💧", question: "Safe sanitation primarily refers to…", options: ["Proper toilets & waste management", "Swimming lessons", "Sprinkler systems", "Fountain maintenance"], answer: 0, hint: "Human waste handled safely." }
    ],
    []
  );

  /* --------------------------------- State --------------------------------- */
  const TOTAL_QUESTIONS = 10;
  const ROUND_TIME = 20;
  const [screen, setScreen] = useState("start");
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [canAnswer, setCanAnswer] = useState(true);
  const [lifelines, setLifelines] = useState({ fifty: true, hint: true });
  const [showHint, setShowHint] = useState(false);
  const intervalRef = useRef(null);
  const currentQ = pool[idx];

  /* ------------------------------ Init / Start ------------------------------ */
  const startGame = () => {
    const shuffled = shuffle([...BANK]).slice(0, TOTAL_QUESTIONS);
    setPool(shuffled);
    setIdx(0);
    setScore(0);
    setTimer(ROUND_TIME);
    setCanAnswer(true);
    setLifelines({ fifty: true, hint: true });
    setShowHint(false);
    setScreen("quiz");
  };

  /* --------------------------------- Timer --------------------------------- */
  useEffect(() => {
    if (screen !== "quiz") return;
    if (!currentQ) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setTimer(ROUND_TIME);
    intervalRef.current = window.setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          setCanAnswer(false);
        }
        return Math.max(0, t - 1);
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, idx]);

  /* --------------------------- Keyboard Shortcuts --------------------------- */
  useEffect(() => {
    const onKey = (e) => {
      if (screen !== "quiz") return;
      const map = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (map[e.key] !== undefined) {
        handleSelect(map[e.key]);
      } else if (e.key === "Enter") {
        if (!canAnswer) nextQuestion();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, canAnswer]);

  /* -------------------------------- Handlers -------------------------------- */
  const handleSelect = (choice) => {
    if (!canAnswer || !currentQ) return;
    setCanAnswer(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    if (choice === currentQ.answer) {
      const timeBonus = Math.max(0, timer);
      const gained = 10 + Math.round(timeBonus / 4);
      setScore((s) => s + gained);
    }
    setSelection(choice);
  };

  const [selection, setSelection] = useState(null);
  useEffect(() => setSelection(null), [idx]);

  const nextQuestion = () => {
    if (idx + 1 >= TOTAL_QUESTIONS) {
      setScreen("result");
    } else {
      setIdx((i) => i + 1);
      setShowHint(false);
      setCanAnswer(true);
    }
  };

  // Lifelines
  const onFifty = () => {
    if (!canAnswer) return;
    if (!lifelines.fifty) return;
    setLifelines((l) => ({ ...l, fifty: false }));
  };
  const onHint = () => {
    if (!canAnswer) return;
    if (!lifelines.hint) return;
    setLifelines((l) => ({ ...l, hint: false }));
    setShowHint(true);
  };


  /* ------------------------------- Game Over ------------------------------- */
  /* ------------------------------ Leaderboard ------------------------------- */
  const LB_KEY = "sdg_lb";
  const getLB = () => {
    try {
      return JSON.parse(localStorage.getItem(LB_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const saveScore = (name) => {
    const stamp = new Date().toISOString().split("T")[0];
    const rec = { name: (name || "Player").trim(), score, date: stamp };
    const board = [...getLB(), rec].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem(LB_KEY, JSON.stringify(board));
  };
  const resetLB = () => {
    localStorage.removeItem(LB_KEY);
  };

  /* --------------------------------- Render -------------------------------- */
  const percent = Math.max(0, (timer / ROUND_TIME) * 100);

  return (
    <div className="sdg-wrap">
      <div className="sdg-card" role="application" aria-label="SDG Trivia Challenge game">
        {/* Header */}
        <header className="sdg-header">
          <div className="brand">
            <div className="logo">SDG</div>
            <div>SDG Trivia Challenge</div>
          </div>
          <div className="stats">
            <div className="pill" title="Current Score">
              <span>⭐ Score:&nbsp;</span>
              <strong>{score}</strong>
            </div>
            <div className="pill" title="Question Number">
              <span>❓ Q:&nbsp;</span>
              <strong>
                {screen === "quiz" ? idx + 1 : 0}/{TOTAL_QUESTIONS}
              </strong>
            </div>
            <div className="pill" title="Lifelines">
              <span>🛟 Lifelines:&nbsp;</span>
              <strong>{Number(lifelines.fifty) + Number(lifelines.hint)}</strong>
            </div>
          </div>
        </header>

        <div className="content">
          {/* Start Screen */}
          {screen === "start" && (
            <StartScreen
              onStart={startGame}
              onResetLB={() => {
                resetLB();
                alert("Leaderboard cleared.");
              }}
            />
          )}

          {/* Quiz Screen */}
          {screen === "quiz" && currentQ && (
            <section className="quiz" aria-live="polite">
              <div className="q-head">
                <div className="sdg-tag">
                  {currentQ.icon} SDG {currentQ.sdg}
                </div>
                <div className="progress" aria-label="Time remaining">
                  <div className="bar" style={{ width: `${percent}%` }} />
                </div>
                <div className="timer">{timer}s</div>
              </div>

              <div className="question">{currentQ.question}</div>

              <div className="options">
                {currentQ.options.map((opt, i) => {
                  const isCorrect = i === currentQ.answer;
                  const isChosen = selection === i;

                  let disabledByFifty = false;
                  if (!lifelines.fifty) {
                    const wrongs = [0, 1, 2, 3].filter((x) => x !== currentQ.answer);
                    const toRemove = seededPickTwo(wrongs, idx);
                    disabledByFifty = toRemove.includes(i);
                  }

                  const classes = [
                    "opt",
                    !canAnswer && isCorrect ? "correct" : "",
                    !canAnswer && isChosen && !isCorrect ? "wrong" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={i}
                      className={classes}
                      onClick={() => handleSelect(i)}
                      disabled={!canAnswer || disabledByFifty}
                      style={disabledByFifty ? { opacity: 0.45, filter: "grayscale(50%)" } : undefined}
                    >
                      <span className="key text-white">{i + 1}</span> <span className="text-gray-100">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="helper-row">
                <div>
                  <button
                    className="warning"
                    onClick={onFifty}
                    disabled={!lifelines.fifty || !canAnswer}
                    title="Remove two wrong options (once per game)"
                  >
                    50/50
                  </button>
                  <button
                    className="secondary"
                    onClick={onHint}
                    disabled={!lifelines.hint || !canAnswer}
                    title="Show a hint (once per game)"
                  >
                    Hint
                  </button>
                </div>
                <div className={`hint ${showHint ? "show" : ""}`}>
                  {showHint ? `💡 Hint: ${currentQ.hint}` : ""}
                </div>
              </div>

              <div className="foot">
                <div className="copy">
                  Keyboard: <kbd className="kbd">1</kbd>
                  <kbd className="kbd">2</kbd>
                  <kbd className="kbd">3</kbd>
                  <kbd className="kbd">4</kbd>, Next: <kbd className="kbd">Enter</kbd>
                </div>
                <button className="secondary" onClick={nextQuestion} disabled={canAnswer}>
                  Next
                </button>
              </div>
            </section>
          )}

          {/* Result Screen */}
          {screen === "result" && (
            <ResultScreen score={score} onRestart={startGame} onSave={saveScore} getLB={getLB} />)
          }
        </div>
      </div>

      {/* Styles */}
      <style>{css}</style>
    </div>
  );
}

/* --------------------------------- Extras --------------------------------- */
function StartScreen({ onStart, onResetLB }) {
  const [show, setShow] = useState(false);
  return (
    <section className="intro" aria-live="polite">
      <h1>
        Welcome to the <span style={{ color: "var(--accent)" }}>SDG</span> Trivia!
      </h1>
      <p>
        Test your knowledge of the <strong>United Nations Sustainable Development Goals (SDGs)</strong> — 10
        questions, 20 seconds each. Earn points, use lifelines (<strong>50/50</strong> & <strong>Hint</strong>), and aim for the leaderboard!
      </p>
      <div className="row" style={{ marginTop: 6 }}>
        <button onClick={onStart}>Start Game</button>
        <button className="secondary" onClick={() => setShow((s) => !s)}>
          How to Play
        </button>
        <button className="ghost" onClick={onResetLB} title="Clear saved leaderboard">
          Reset Leaderboard
        </button>
      </div>
      {show && (
        <div className="copy" style={{ marginTop: 10, textAlign: "left" }}>
          <ul>
            <li>
              Use your mouse/tap or press <kbd className="kbd">1</kbd>
              <kbd className="kbd">2</kbd>
              <kbd className="kbd">3</kbd>
              <kbd className="kbd">4</kbd> to select answers.
            </li>
            <li>
              Each correct answer = <strong>10 pts</strong>. Answer quickly for a small time bonus.
            </li>
            <li>
              You have two lifelines per game: <strong>50/50</strong> (removes two wrong options) and
              <strong> Hint</strong> (brief clue).
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

function ResultScreen({ score, onRestart, onSave, getLB }) {
  const [name, setName] = useState("");
  const board = getLB();
  let title = "Great run! 🎉";
  let remark = "Solid effort—keep pushing your SDG knowledge!";
  if (score >= 120) {
    title = "Outstanding! 🌟";
    remark = "SDG Champion—phenomenal awareness!";
  } else if (score >= 90) {
    title = "Well done! 💪";
    remark = "You’re on the right track—excellent grasp!";
  } else if (score < 60) {
    title = "Nice try! 🚀";
    remark = "Practice a bit more—every step counts.";
  }

  const shareScore = () => {
    const text = `I just scored ${score} in the SDG Trivia Challenge! Can you beat me? 🌍🎮`;
    if (navigator.share) {
      navigator
        .share({ title: "SDG Trivia Challenge", text, url: typeof location !== "undefined" ? location.href : undefined })
        .catch(() => copyText(text));
    } else {
      copyText(text);
      alert("Share text copied to clipboard!");
    }
  };

  return (
    <section className="result" aria-live="polite">
      <div className="big">{title}</div>
      <div style={{ fontSize: 18 }}>
        Your score: <strong>{score}</strong>
      </div>
      <div className="copy">{remark}</div>

      <div className="leader">
        <div className="copy">Save your score to the local leaderboard:</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={20}
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "#0a1430", color: "#e9eefc" }}
          />
          <button
            onClick={() => {
              onSave(name);
              alert("Saved to leaderboard!");
            }}
            className="accent"
          >
            Save
          </button>
          <button className="secondary" onClick={onRestart}>
            Play Again
          </button>
          <button className="ghost" onClick={shareScore} title="Copy a shareable message">
            Share
          </button>
        </div>

        <div className="copy" style={{ marginTop: 12 }}>
          <h3 style={{ margin: "6px 0 8px" }}>🏆 Leaderboard (local)</h3>
          <div>
            {board.length === 0 ? (
              <div className="copy">No scores yet. Be the first!</div>
            ) : (
              board.map((r, i) => (
                <div className="lb-item" key={`${r.name}-${i}`}>
                  <div>
                    <span className="sr">#{i + 1}</span> <strong>{escapeHTML(r.name)}</strong>
                  </div>
                  <div>⭐ {r.score}</div>
                  <div className="copy">{r.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Helpers -------------------------------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function seededPickTwo(wrongs, seed) {
  // Simple deterministic selection based on question index to avoid UI flicker
  const a = seed % wrongs.length;
  const b = (seed + 1) % wrongs.length;
  const pick = new Set();
  pick.add(wrongs[a]);
  if (wrongs[b] !== undefined) pick.add(wrongs[b]);
  return Array.from(pick).slice(0, 2);
}
function escapeHTML(s) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return s.replace(/[&<>"']/g, (m) => map[m]);
}
function copyText(t) {
  const ta = document.createElement("textarea");
  ta.value = t;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

/* ---------------------------------- CSS ----------------------------------- */
const css = `
:root{--bg:#0b1220;--card:#111a2e;--muted:#8aa0c7;--text:#e9eefc;--accent:#57dd8a;--accent-2:#6ca7ff;--warning:#ffc857;--danger:#ff6b6b;--border:#223154}
*{box-sizing:border-box}
.sdg-wrap{min-height:100dvh;display:flex;align-items:center;justify-content:center;background:radial-gradient(1200px 600px at 10% 0%, #0e1630 0%, var(--bg) 50%),radial-gradient(1000px 500px at 90% 0%, #0d1a36 0%, var(--bg) 50%),var(--bg);padding:24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;color:var(--text)}
.sdg-card{width:min(940px,100%);background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,0)),var(--card);border:1px solid var(--border);border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.35);overflow:hidden}
.sdg-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:.2px}
.logo{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:conic-gradient(from 180deg at 50% 50%, #ff6b6b, #ffd166, #06d6a0, #118ab2, #ef476f, #ff6b6b);color:#001220;font-size:22px;font-weight:900;border:1px solid #ffffff22}
.stats{display:flex;gap:12px;flex-wrap:wrap}
.pill{display:flex;gap:8px;align-items:center;padding:8px 12px;border:1px solid var(--border);border-radius:999px;color:var(--muted);font-size:.95rem;background:#0e1933a0}
.pill strong{color:var(--text)}
.content{padding:22px;display:grid;gap:18px}
.intro{display:grid;gap:14px;text-align:center;padding:28px 10px}
.intro h1{margin:6px 0 2px;font-size:clamp(24px,4vw,36px)}
.intro p{margin:0 auto;max-width:58ch;color:var(--muted)}
.row{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
button{background:var(--accent-2);color:#071221;border:none;padding:12px 16px;border-radius:12px;font-weight:700;cursor:pointer;transition:.2s transform,.2s opacity,.2s filter}
button:hover{transform:translateY(-1px)}
button.accent{background:var(--accent);color:#071221}
button.secondary{background:#1b2b52;color:#cfe1ff;border:1px solid var(--border)}
button.warning{background:var(--warning);color:#1b1404}
button.danger{background:var(--danger);color:#280b0b}
button.ghost{background:transparent;border:1px dashed var(--border);color:var(--muted)}
button:disabled{opacity:.55;cursor:not-allowed;filter:grayscale(.2)}
.quiz .q-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:6px;border:1px solid var(--border);border-radius:12px;background:#0f1b36}
.sdg-tag{padding:8px 10px;background:#0b1934;border:1px solid var(--border);border-radius:10px;color:#cde0ff;font-weight:700}
.progress{flex:1;height:10px;background:#0a1430;border-radius:999px;overflow:hidden;border:1px solid var(--border)}
.bar{height:100%;width:0%;background:linear-gradient(90deg,var(--accent),#9ef1b7)}
.timer{min-width:72px;text-align:center;font-variant-numeric:tabular-nums}
.question{font-size:clamp(18px,2.6vw,22px);line-height:1.35;margin:2px 0 8px}
.options{display:grid;gap:10px}
.opt{border:1px solid var(--border);border-radius:12px;background:#0e1833;padding:12px 14px;text-align:left;display:flex;gap:10px;align-items:flex-start;cursor:pointer;transition:.14s transform,.14s border-color,.14s background}
.opt .key{width:28px;height:28px;border-radius:6px;border:1px solid var(--border);display:grid;place-items:center;color:#c6d7ff;font-weight:800;font-size:.9rem;background:#0a1430}
.opt:hover{transform:translateY(-1px);border-color:#315092}
.opt.correct{border-color:#1fd78c;background:#0f2a22}
.opt.wrong{border-color:#e05a5a;background:#2a1214}
.helper-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;align-items:center}
.hint{color:#d8e7ff;opacity:.9;background:#0b1a38;border:1px dashed var(--border);padding:10px 12px;border-radius:10px;display:none}
.hint.show{display:block}
.foot{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.score{font-weight:800}
.result{text-align:center;display:grid;gap:12px;padding:14px 8px}
.big{font-size:clamp(28px,6vw,44px);font-weight:900}
.leader{display:grid;gap:10px;margin-top:6px}
.lb-item{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;background:#0e1933;border:1px solid var(--border);border-radius:12px;color:#c9dcff}
.sr{opacity:.7;min-width:28px;text-align:right;font-variant-numeric:tabular-nums}
.copy{font-size:.9rem;color:var(--muted)}
.kbd{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;border:1px solid var(--border);padding:2px 6px;border-radius:6px;background:#0a1430;color:#cfe1ff}
@media (max-width:520px){.sdg-header{flex-direction:column;align-items:flex-start}.timer{align-self:flex-end}}
`
