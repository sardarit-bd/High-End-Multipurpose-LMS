"use client";

import { useMemo, useState, useEffect, useCallback } from "react";

/**
 * Sustainable Cities — SDG 11 (Goal 11)
 * Dark-theme, Tailwind-only, improved UI/UX
 * - Radial sustainability ring
 * - Animated gauges
 * - Sticky Actions panel
 * - Clearer cards, badges, and hierarchy
 */

export default function SustainableCitiesGame() {
    // -------------------- Model constants --------------------
    const START = useMemo(
        () => ({
            year: 1,
            maxYears: 20,
            budget: 120,
            energy: 40,
            housing: 35,
            transit: 25,
            greens: 20,
            pollution: 40,    // lower is better
            happiness: 55,
            resilience: 40,
            population: 50,
        }),
        []
    );

    const ACTIONS = useMemo(
        () => [
            {
                id: "housing",
                title: "Mixed-Income Housing",
                desc: "Adds inclusive homes with modest footprint.",
                cost: 12,
                effect: (s) => ({
                    housing: s.housing + 8,
                    happiness: s.happiness + 3,
                    budget: s.budget - 12,
                    pollution: s.pollution + 2,
                }),
                tag: "Equity",
            },
            {
                id: "park",
                title: "Urban Park",
                desc: "Green space for heat relief & well-being.",
                cost: 10,
                effect: (s) => ({
                    greens: s.greens + 10,
                    happiness: s.happiness + 4,
                    resilience: s.resilience + 2,
                    pollution: Math.max(0, s.pollution - 4),
                    budget: s.budget - 10,
                }),
                tag: "Nature-Based",
            },
            {
                id: "solar",
                title: "Solar Plant",
                desc: "Clean energy capacity expansion.",
                cost: 14,
                effect: (s) => ({
                    energy: s.energy + 12,
                    pollution: Math.max(0, s.pollution - 3),
                    resilience: s.resilience + 1,
                    budget: s.budget - 14,
                }),
                tag: "Clean Energy",
            },
            {
                id: "transit",
                title: "Public Transit",
                desc: "Buses/BRT/rail shift trips from cars.",
                cost: 16,
                effect: (s) => ({
                    transit: s.transit + 12,
                    happiness: s.happiness + 2,
                    pollution: Math.max(0, s.pollution - 5),
                    budget: s.budget - 16,
                }),
                tag: "Mobility",
            },
            {
                id: "retrofit",
                title: "Retrofit Buildings",
                desc: "Insulation, safety, efficiency upgrades.",
                cost: 12,
                effect: (s) => ({
                    energy: s.energy + 4,
                    resilience: s.resilience + 6,
                    pollution: Math.max(0, s.pollution - 2),
                    budget: s.budget - 12,
                }),
                tag: "Efficiency",
            },
            {
                id: "industry",
                title: "Eco-Industrial Zone",
                desc: "Jobs with cleaner standards.",
                cost: 15,
                effect: (s) => ({
                    budget: s.budget - 15 + 6,
                    happiness: s.happiness + 1,
                    pollution: s.pollution + 2,
                    energy: s.energy - 2,
                }),
                tag: "Economy",
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
                tag: "Resilience",
            },
        ],
        []
    );

    // -------------------- State --------------------
    const [state, setState] = useState(START);
    const [log, setLog] = useState([
        "Welcome, Mayor! Balance growth, climate action, and equity to meet SDG-11.",
    ]);
    const [selected, setSelected] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // -------------------- Helpers --------------------
    const clamp01 = (v) => Math.max(0, Math.min(100, v));
    const pct = (num, den) => (den <= 0 ? 0 : Math.round((num / den) * 100));

    const derived = useMemo(() => {
        const { housing, population, energy, transit, greens, pollution, happiness, resilience } = state;
        const capacityOK = housing >= population;
        const energyOK = energy >= Math.ceil(population * 0.6);
        const mobilityOK = transit >= Math.ceil(population * 0.4);

        const sustainability = clamp01(
            Math.round(
                (clamp01(100 - pollution) * 0.25 +
                    clamp01(happiness) * 0.25 +
                    clamp01(resilience) * 0.25 +
                    clamp01((greens + transit + energy) / 3) * 0.25)
            )
        );

        return { capacityOK, energyOK, mobilityOK, sustainability };
    }, [state]);

    // -------------------- Random Events --------------------
    function yearlyEvent(next) {
        const roll = Math.random();
        let note = null;

        if (roll < 0.15) {
            const hit = Math.max(1, 6 - Math.floor(next.resilience / 20)) + (next.pollution > 60 ? 2 : 0);
            next.happiness = clamp01(next.happiness - (3 + hit));
            next.energy = Math.max(0, next.energy - 3);
            note = "Heatwave stressed the grid and residents.";
        } else if (roll < 0.28) {
            const dmg = Math.max(1, 5 - Math.floor(next.resilience / 25));
            next.housing = Math.max(0, next.housing - dmg);
            next.transit = Math.max(0, next.transit - (dmg - 1));
            next.budget = Math.max(0, next.budget - 4);
            note = "Flash flood caused localized damage.";
        } else if (roll < 0.38) {
            next.happiness = clamp01(next.happiness + 4);
            next.resilience = clamp01(next.resilience + 2);
            note = "Community initiative boosted morale and preparedness.";
        } else if (roll < 0.46) {
            next.happiness = Math.max(0, next.happiness - 2);
            next.pollution = clamp01(next.pollution + 3);
            note = "Air quality alert — residents concerned.";
        } else if (roll < 0.54) {
            next.budget = next.budget + 8;
            note = "National sustainability grant awarded!";
        }
        return note;
    }

    // -------------------- Turn Advance --------------------
    function endTurn(withActionNote) {
        if (gameOver) return;
        const next = { ...state };

        next.year = state.year + 1;
        next.population = Math.min(100, next.population + 3);
        next.pollution = clamp01(next.pollution + (next.population > next.transit ? 1 : 0));

        if (next.housing < next.population) next.happiness = Math.max(0, next.happiness - 3);
        if (next.energy < Math.ceil(next.population * 0.6)) {
            next.happiness = Math.max(0, next.happiness - 2);
            next.pollution = clamp01(next.pollution + 2);
        }
        if (next.greens > 40) {
            next.pollution = Math.max(0, next.pollution - 1);
            next.happiness = clamp01(next.happiness + 1);
        }

        const note = yearlyEvent(next);
        next.budget = clamp01(next.budget + Math.floor(next.population / 10));

        next.energy = clamp01(next.energy);
        next.housing = clamp01(next.housing);
        next.transit = clamp01(next.transit);
        next.greens = clamp01(next.greens);
        next.happiness = clamp01(next.happiness);
        next.resilience = clamp01(next.resilience);
        next.pollution = clamp01(next.pollution);

        let newLog = [...log];
        if (withActionNote) newLog.push(withActionNote);
        if (note) newLog.push(note);

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
                    ? "🏆 SDG-11 Achieved! Your city is inclusive, safe, resilient, and sustainable."
                    : "🔎 Progress made, but SDG-11 targets were missed.";

            newLog.push(`Final Score: ${finalScore}/100 — ${verdict}`);
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

        if (action.id === "housing" && next.transit < Math.ceil(next.population * 0.4)) {
            next.happiness = Math.max(0, next.happiness - 1);
        }
        if (action.id === "industry" && next.greens < 20) {
            next.pollution = clamp01(next.pollution + 1);
        }
        if (action.id === "transit" && next.housing >= next.population) {
            next.happiness = clamp01(next.happiness + 1);
        }

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
        setLog(["New term begins. Aim for SDG-11 by Year 20!"]);
        setGameOver(false);
    }

    // -------------------- Keyboard: Enter = Next/Submit --------------------
    const onKey = useCallback((e) => {
        if (e.key !== "Enter") return;
        // If an action is focused, pressing Enter will click it naturally.
        // Otherwise, ignore.
    }, []);
    useEffect(() => {
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onKey]);

    // -------------------- UI Helpers --------------------
    const Ring = ({ value, size = 120, label = "Sustainability" }) => {
        const val = Math.max(0, Math.min(100, value));
        const angle = (val / 100) * 360;
        const style = {
            background: `conic-gradient(#22c55e ${angle}deg, #1f2937 ${angle}deg)`,
            width: size,
            height: size,
        };
        return (
            <div className="relative inline-flex items-center justify-center">
                <div
                    className="rounded-full p-[10px] bg-gray-900"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(148,163,184,.2)" }}
                >
                    <div className="rounded-full" style={style} />
                </div>
                <div className="absolute text-center">
                    <div className="text-2xl font-bold">{val}</div>
                    <div className="text-[11px] text-gray-400">{label}</div>
                </div>
            </div>
        );
    };

    const Gauge = ({ label, value, invert }) => {
        const good = invert ? 100 - value : value;
        const bar =
            good > 66 ? "bg-emerald-500" : good > 33 ? "bg-amber-500" : "bg-rose-500";
        return (
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{label}</span>
                    <span className="font-semibold text-gray-200">{value}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded overflow-hidden">
                    <div
                        className={`h-full ${bar} transition-all`}
                        style={{ width: `${good}%` }}
                    />
                </div>
            </div>
        );
    };

    const Pill = ({ ok, text }) => (
        <span
            className={[
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border",
                ok
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-300 border-amber-500/30",
            ].join(" ")}
            title={text}
        >
            {ok ? "✓" : "!"} {text}
        </span>
    );

    // -------------------- Render --------------------
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-gray-100">
            {/* Top Bar */}
            <header className="sticky top-0 z-20 border-b border-gray-800/80 backdrop-blur bg-gray-950/70">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                            Sustainable Cities — <span className="text-indigo-400">SDG-11</span>
                        </h1>
                        <p className="hidden md:block text-[12px] text-gray-400">
                            Build an inclusive, safe, resilient, and sustainable city in {state.maxYears} years.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600/15 border border-indigo-600/30">
                            Year <b>{state.year}</b> / {state.maxYears}
                        </span>
                        <button
                            onClick={reset}
                            className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
                            title="Restart the simulation"
                        >
                            Restart
                        </button>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">
                {/* Dashboard (left) */}
                <section className="lg:col-span-2 space-y-6">
                    {/* Summary Cards */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
                            <div className="text-xs text-gray-400">Budget</div>
                            <div className="mt-1 text-2xl font-semibold text-emerald-400">{state.budget}</div>
                            <div className="text-[11px] text-gray-500">Small revenue added yearly</div>
                        </div>

                        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
                            <div className="text-xs text-gray-400">Population</div>
                            <div className="mt-1 text-2xl font-semibold text-indigo-400">{state.population}</div>
                            <div className="text-[11px] text-gray-500">Gradual growth</div>
                        </div>

                        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-400">Sustainability Index</div>
                                <div className="mt-1 text-[11px] text-gray-500">
                                    Balanced from happiness, resilience, clean energy, transit & greens
                                </div>
                            </div>
                            <Ring value={derived.sustainability} size={96} label="Index" />
                        </div>
                    </div>

                    {/* Health pills */}
                    <div className="flex flex-wrap gap-2">
                        <Pill ok={state.housing >= state.population} text="Housing fit" />
                        <Pill ok={state.energy >= Math.ceil(state.population * 0.6)} text="Energy supply" />
                        <Pill ok={state.transit >= Math.ceil(state.population * 0.4)} text="Mobility access" />
                    </div>

                    {/* Gauges */}
                    <div className="grid md:grid-cols-4 gap-3">
                        <Gauge label="Housing" value={state.housing} />
                        <Gauge label="Transit" value={state.transit} />
                        <Gauge label="Green Space" value={state.greens} />
                        <Gauge label="Clean Energy" value={state.energy} />
                        <Gauge label="Happiness" value={state.happiness} />
                        <Gauge label="Resilience" value={state.resilience} />
                        <Gauge label="Pollution" value={state.pollution} invert />
                        <Gauge
                            label="Population Fit"
                            value={pct(Math.min(state.housing, state.population), state.population)}
                        />
                    </div>

                    {/* Log */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-2">City Log</h3>
                        <div
                            className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4 h-64 overflow-auto text-sm"
                            aria-live="polite"
                        >
                            {log.slice().reverse().map((l, i) => (
                                <div key={i} className="mb-2">
                                    • {l}
                                </div>
                            ))}
                        </div>

                        {/* Game over */}
                        {gameOver && (
                            <div className="mt-3 bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
                                <div className="text-lg font-semibold mb-1">Term Complete</div>
                                <p className="text-sm text-gray-300">
                                    Final Sustainability Index: <b>{derived.sustainability}</b>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Aim for high happiness & resilience, low pollution, and adequate housing / energy / transit.
                                </p>
                                <button
                                    onClick={reset}
                                    className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Sticky Actions (right) */}
                <aside className="lg:sticky lg:top-20 h-fit">
                    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-gray-200">Choose an Action</h3>
                            <span className="text-[11px] text-gray-400">1 action = 1 year</span>
                        </div>

                        <div className="grid gap-2">
                            {ACTIONS.map((a) => {
                                const disabled = !canAfford(a) || gameOver;
                                const isSelected = selected === a.id;
                                return (
                                    <button
                                        key={a.id}
                                        onClick={() => doAction(a)}
                                        disabled={disabled}
                                        className={[
                                            "group text-left rounded-xl p-3 border transition",
                                            "bg-gray-950/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900/70",
                                            disabled ? "opacity-50 cursor-not-allowed" : "",
                                            isSelected ? "ring-2 ring-indigo-500" : "",
                                        ].join(" ")}
                                        title={a.desc}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="font-medium">{a.title}</div>
                                                <p className="text-xs text-gray-400">{a.desc}</p>
                                                <span className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-300">
                                                    {a.tag}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[11px] text-gray-400">Cost</div>
                                                <div className="text-sm font-semibold text-indigo-300">{a.cost}</div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-3 text-[12px] text-gray-500">
                            Tip: Actions auto-advance to next year. Keep budget healthy.
                        </div>
                    </div>
                </aside>
            </main>

            {/* Footer Tips */}
            <footer className="max-w-6xl mx-auto px-4 pb-10">
                <div className="mt-2 text-[12px] text-gray-500">
                    <b>Design Note:</b> Prioritize balance — housing with transit, clean energy for growth,
                    parks for cooling, and mitigation for shocks.
                </div>
            </footer>
        </div>
    );
}
