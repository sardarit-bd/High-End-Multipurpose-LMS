"use client";

import { useMemo, useState } from "react";

/**
 * Sustainable Cities — SDG 11 (Goal 11)
 * Build a sustainable city by balancing resources across 20 turns ("years").
 * No external libs. Dark theme via Tailwind.
 */
export default function SustainableCitiesGame() {
    // -------------------- Model constants (tweak to rebalance) --------------------
    const START = useMemo(
        () => ({
            year: 1,
            maxYears: 20,
            budget: 120,       // city budget (points)
            energy: 40,        // available clean energy
            housing: 35,       // housing capacity
            transit: 25,       // transit quality/coverage
            greens: 20,        // green/public space
            pollution: 40,     // lower is better
            happiness: 55,     // higher is better
            resilience: 40,    // disaster preparedness & adaptability
            population: 50,    // implicit demand driver
        }),
        []
    );

    const ACTIONS = useMemo(
        () => [
            {
                id: "housing",
                title: "Build Mixed-Income Housing",
                desc: "Adds inclusive homes, modest footprint.",
                cost: 12,
                effect: (s) => ({
                    housing: s.housing + 8,
                    happiness: s.happiness + 3,
                    budget: s.budget - 12,
                    pollution: s.pollution + 2,
                }),
                tip: "Supports inclusivity; watch infrastructure and pollution.",
            },
            {
                id: "park",
                title: "Create Urban Park",
                desc: "Green space, heat relief, well-being.",
                cost: 10,
                effect: (s) => ({
                    greens: s.greens + 10,
                    happiness: s.happiness + 4,
                    resilience: s.resilience + 2,
                    pollution: Math.max(0, s.pollution - 4),
                    budget: s.budget - 10,
                }),
                tip: "Parks lower pollution and boost resilience.",
            },
            {
                id: "solar",
                title: "Build Solar Plant",
                desc: "Clean energy capacity increase.",
                cost: 14,
                effect: (s) => ({
                    energy: s.energy + 12,
                    pollution: Math.max(0, s.pollution - 3),
                    resilience: s.resilience + 1,
                    budget: s.budget - 14,
                }),
                tip: "Clean energy cuts pollution; powers growth.",
            },
            {
                id: "transit",
                title: "Expand Public Transit",
                desc: "Bus/BRT/rail lines—access & mode shift.",
                cost: 16,
                effect: (s) => ({
                    transit: s.transit + 12,
                    happiness: s.happiness + 2,
                    pollution: Math.max(0, s.pollution - 5),
                    budget: s.budget - 16,
                }),
                tip: "Transit reduces traffic emissions.",
            },
            {
                id: "retrofit",
                title: "Retrofit Old Buildings",
                desc: "Insulation, efficiency, safety.",
                cost: 12,
                effect: (s) => ({
                    energy: s.energy + 4,
                    resilience: s.resilience + 6,
                    pollution: Math.max(0, s.pollution - 2),
                    budget: s.budget - 12,
                }),
                tip: "Efficiency saves energy and increases safety.",
            },
            {
                id: "industry",
                title: "Eco-Industrial Zone",
                desc: "Jobs with cleaner standards.",
                cost: 15,
                effect: (s) => ({
                    budget: s.budget - 15 + 6, // partial payback via jobs
                    happiness: s.happiness + 1,
                    pollution: s.pollution + 2,
                    energy: s.energy - 2,
                }),
                tip: "Boosts economy; mind pollution and energy draw.",
            },
            {
                id: "mitigation",
                title: "Flood & Heat Mitigation",
                desc: "Blue-green infra, cool roofs, drainage.",
                cost: 13,
                effect: (s) => ({
                    resilience: s.resilience + 10,
                    greens: s.greens + 3,
                    budget: s.budget - 13,
                    pollution: Math.max(0, s.pollution - 1),
                }),
                tip: "Reduces disaster damage; improves livability.",
            },
        ],
        []
    );

    // -------------------- State --------------------
    const [state, setState] = useState(START);
    const [log, setLog] = useState([
        "Welcome, Mayor! Balance growth, climate action, and equity to meet SDG 11.",
    ]);
    const [selected, setSelected] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // -------------------- Helpers --------------------
    const clamp01 = (v) => Math.max(0, Math.min(100, v));
    const pct = (num, den) => (den <= 0 ? 0 : Math.round((num / den) * 100));

    const derived = useMemo(() => {
        const { housing, population, energy, transit, greens, pollution, happiness, resilience } =
            state;
        const capacityOK = housing >= population;
        const energyOK = energy >= Math.ceil(population * 0.6); // simplistic demand proxy
        const mobilityOK = transit >= Math.ceil(population * 0.4);
        // Overall sustainability index (rough blend)
        const sustainability = clamp01(
            Math.round(
                (clamp01(100 - pollution) * 0.25 +
                    clamp01(happiness) * 0.25 +
                    clamp01(resilience) * 0.25 +
                    clamp01((greens + transit + energy) / 3) * 0.25) /
                1
            )
        );

        return { capacityOK, energyOK, mobilityOK, sustainability };
    }, [state]);

    // -------------------- Random city events per year --------------------
    function yearlyEvent(next) {
        // Weighted simple events depending on resilience & pollution
        const roll = Math.random();
        let note = null;

        if (roll < 0.15) {
            // Heatwave
            const hit =
                Math.max(1, 6 - Math.floor(next.resilience / 20)) +
                (next.pollution > 60 ? 2 : 0);
            next.happiness = clamp01(next.happiness - (3 + hit));
            next.energy = Math.max(0, next.energy - 3);
            note = "Heatwave stressed the grid and citizens.";
        } else if (roll < 0.28) {
            // Flash flood
            const dmg = Math.max(1, 5 - Math.floor(next.resilience / 25));
            next.housing = Math.max(0, next.housing - dmg);
            next.transit = Math.max(0, next.transit - (dmg - 1));
            next.budget = Math.max(0, next.budget - 4);
            note = "Flash flood caused localized damage.";
        } else if (roll < 0.38) {
            // Civic initiative
            next.happiness = clamp01(next.happiness + 4);
            next.resilience = clamp01(next.resilience + 2);
            note = "Community initiative boosted morale and preparedness.";
        } else if (roll < 0.46) {
            // Air quality alert
            next.happiness = Math.max(0, next.happiness - 2);
            next.pollution = clamp01(next.pollution + 3);
            note = "Air quality alert—residents concerned.";
        } else if (roll < 0.54) {
            // Grant
            next.budget = next.budget + 8;
            note = "You received a national sustainability grant!";
        }

        return note;
    }

    // -------------------- Turn advance --------------------
    function endTurn(withActionNote) {
        const currentYear = state.year;
        if (gameOver) return;

        // Apply passive change: small population growth; minor pollution drift.
        const next = { ...state };
        next.year = currentYear + 1;
        next.population = Math.min(100, next.population + 3); // slow growth
        next.pollution = clamp01(next.pollution + (next.population > next.transit ? 1 : 0));

        // If housing below population -> happiness down
        if (next.housing < next.population) {
            next.happiness = Math.max(0, next.happiness - 3);
        }
        // If energy below demand -> happiness down + pollution up (backup gens)
        if (next.energy < Math.ceil(next.population * 0.6)) {
            next.happiness = Math.max(0, next.happiness - 2);
            next.pollution = clamp01(next.pollution + 2);
        }
        // Greens cool city slightly
        if (next.greens > 40) {
            next.pollution = Math.max(0, next.pollution - 1);
            next.happiness = clamp01(next.happiness + 1);
        }

        // Random event
        const note = yearlyEvent(next);

        // Modest recurring revenue tied to population & industry
        next.budget = clamp01(next.budget + Math.floor(next.population / 10));

        // Cap key stats
        next.energy = clamp01(next.energy);
        next.housing = clamp01(next.housing);
        next.transit = clamp01(next.transit);
        next.greens = clamp01(next.greens);
        next.happiness = clamp01(next.happiness);
        next.resilience = clamp01(next.resilience);
        next.pollution = clamp01(next.pollution);

        // Check end of game
        let newLog = [...log];
        if (withActionNote) newLog.push(withActionNote);
        if (note) newLog.push(note);

        // Win/lose at final year
        const lastYear = next.year > state.maxYears;
        if (lastYear) {
            const finalScore =
                derived.sustainability +
                (next.happiness >= 60 ? 5 : 0) +
                (next.pollution <= 40 ? 5 : 0) +
                (next.resilience >= 60 ? 5 : 0) +
                (next.housing >= next.population ? 5 : 0) +
                (next.energy >= Math.ceil(next.population * 0.6) ? 5 : 0);

            const verdict =
                finalScore >= 70
                    ? "🏆 SDG 11 Achieved! Your city is inclusive, safe, resilient, and sustainable."
                    : "🔎 Progress Made, But Not Enough. Your city improved, yet SDG 11 targets were missed.";

            newLog.push(
                `Final Score: ${finalScore}/100 — ${verdict}`
            );
            setState(next);
            setLog(newLog);
            setGameOver(true);
            return;
        }

        setState(next);
        setLog(newLog);
    }

    // -------------------- Actions --------------------
    function canAfford(action) {
        return state.budget >= action.cost && !gameOver;
    }

    function doAction(action) {
        if (!canAfford(action)) return;
        let next = { ...state };
        const changed = action.effect(next);
        next = { ...next, ...changed };

        // Gentle synergies/penalties
        if (action.id === "housing" && next.transit < Math.ceil(next.population * 0.4)) {
            next.happiness = Math.max(0, next.happiness - 1); // congestion frustration
        }
        if (action.id === "industry" && next.greens < 20) {
            next.pollution = clamp01(next.pollution + 1);
        }
        if (action.id === "transit" && next.housing >= next.population) {
            next.happiness = clamp01(next.happiness + 1);
        }

        // Clamp
        next.energy = clamp01(next.energy);
        next.housing = clamp01(next.housing);
        next.transit = clamp01(next.transit);
        next.greens = clamp01(next.greens);
        next.happiness = clamp01(next.happiness);
        next.resilience = clamp01(next.resilience);
        next.pollution = clamp01(next.pollution);
        next.budget = Math.max(0, next.budget);

        setState(next);
        setSelected(action.id);
        endTurn(`Action: ${action.title} — ${action.desc}`);
    }

    function reset() {
        setState(START);
        setSelected(null);
        setLog(["New term begins. Aim for SDG 11 by Year 20!"]);
        setGameOver(false);
    }

    // -------------------- UI helpers --------------------
    const Stat = ({ label, value, invert }) => {
        // invert=false: higher is better; invert=true: lower is better (e.g., pollution)
        const good = invert ? 100 - value : value;
        return (
            <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-3">
                <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                    <span>{label}</span>
                    <span className="font-semibold">{value}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                    <div
                        className={`h-full transition-all`}
                        style={{
                            width: `${good}%`,
                            background:
                                good > 66
                                    ? "#10b981" // emerald-500
                                    : good > 33
                                        ? "#f59e0b" // amber-500
                                        : "#ef4444", // red-500
                        }}
                    />
                </div>
            </div>
        );
    };

    // -------------------- Render --------------------
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-6 flex items-center justify-center">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Sustainable Cities — SDG 11
                        </h1>
                        <p className="text-sm text-gray-400">
                            Build an inclusive, safe, resilient, and sustainable city over{" "}
                            <b>{state.maxYears}</b> years. Balance housing, transit, green space,
                            energy, budget, pollution, and well-being.
                        </p>
                    </div>
                    <div className="text-sm text-gray-300">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-600/30">
                                Year <b>{state.year}</b> / {state.maxYears}
                            </span>
                            <button
                                onClick={reset}
                                className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700"
                            >
                                Restart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Top stats */}
                <div className="grid md:grid-cols-4 gap-3 mt-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                        <div className="text-xs text-gray-400">Budget</div>
                        <div className="text-xl font-semibold text-emerald-400">{state.budget}</div>
                        <div className="text-[11px] text-gray-500">Earn small revenue yearly</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                        <div className="text-xs text-gray-400">Population</div>
                        <div className="text-xl font-semibold text-indigo-400">{state.population}</div>
                        <div className="text-[11px] text-gray-500">Grows gradually</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                        <div className="text-xs text-gray-400">Sustainability Index</div>
                        <div className="text-xl font-semibold">{derived.sustainability}</div>
                        <div className="text-[11px] text-gray-500">Blend of key outcomes</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                        <div className="text-xs text-gray-400">Status</div>
                        <div className="text-sm">
                            {(derived.capacityOK ? "🏠 " : "⚠️ ") + "Housing"} ·{" "}
                            {(derived.energyOK ? "⚡ " : "⚠️ ") + "Energy"} ·{" "}
                            {(derived.mobilityOK ? "🚇 " : "⚠️ ") + "Transit"}
                        </div>
                    </div>
                </div>

                {/* Core meters */}
                <div className="grid md:grid-cols-4 gap-3 mt-4">
                    <Stat label="Housing" value={state.housing} />
                    <Stat label="Transit" value={state.transit} />
                    <Stat label="Green Space" value={state.greens} />
                    <Stat label="Energy (Clean)" value={state.energy} />
                    <Stat label="Happiness" value={state.happiness} />
                    <Stat label="Resilience" value={state.resilience} />
                    <Stat label="Pollution" value={state.pollution} invert />
                    <Stat label="Population Fit" value={pct(Math.min(state.housing, state.population), state.population)} />
                </div>

                {/* Actions + Log */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {/* Actions */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">Choose an action (1 per year)</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {ACTIONS.map((a) => (
                                <button
                                    key={a.id}
                                    onClick={() => doAction(a)}
                                    disabled={!canAfford(a) || gameOver}
                                    className={[
                                        "text-left bg-gray-900 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition group",
                                        !canAfford(a) || gameOver ? "opacity-50 cursor-not-allowed" : "",
                                        selected === a.id ? "ring-2 ring-indigo-500" : "",
                                    ].join(" ")}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-semibold">{a.title}</div>
                                            <p className="text-sm text-gray-400">{a.desc}</p>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded bg-indigo-600/20 border border-indigo-600/30">
                                            Cost: {a.cost}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 mt-2 italic">{a.tip}</p>
                                </button>
                            ))}
                        </div>

                        {/* Advance year (disabled because action auto-ends turn) */}
                        <div className="mt-3 text-[12px] text-gray-500">
                            Selecting an action automatically advances one year.
                        </div>
                    </div>

                    {/* Log */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">City Log</h3>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 h-64 overflow-auto text-sm">
                            {log.slice().reverse().map((l, i) => (
                                <div key={i} className="mb-2">
                                    • {l}
                                </div>
                            ))}
                        </div>

                        {/* Game over panel */}
                        {gameOver && (
                            <div className="mt-3 bg-gray-900 border border-gray-800 rounded-xl p-4">
                                <div className="text-lg font-semibold mb-1">Term Complete</div>
                                <p className="text-sm text-gray-300">
                                    Final Sustainability Index: <b>{derived.sustainability}</b>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Aim for high happiness & resilience, low pollution, and adequate housing/energy/transit.
                                </p>
                                <button
                                    onClick={reset}
                                    className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / Tips */}
                <div className="mt-6 text-[12px] text-gray-500">
                    <b>Tips:</b> Balance housing growth with transit and clean energy. Green space lowers
                    pollution and boosts resilience. Disaster mitigation reduces event damage. Keep your budget healthy!
                </div>
            </div>
        </div>
    );
}
