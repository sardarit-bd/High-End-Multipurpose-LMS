"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdKeyboardArrowDown, MdCheck, MdSearch } from "react-icons/md";

/** ---------- Portal (avoids clipping) ---------- */
function MenuPortal({ anchorRef, open, containerRef, children }) {
    const [box, setBox] = useState(null);

    const updateBox = () => {
        const el = anchorRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setBox({ left: r.left, top: r.bottom + 4, width: r.width });
    };

    useLayoutEffect(() => {
        if (!open) return;
        updateBox();
        window.addEventListener("scroll", updateBox, true);
        window.addEventListener("resize", updateBox);
        return () => {
            window.removeEventListener("scroll", updateBox, true);
            window.removeEventListener("resize", updateBox);
        };
    }, [open]);

    if (!open || !box) return null;

    return createPortal(
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                left: box.left,
                top: box.top,
                width: box.width,
                zIndex: 9999,
            }}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-[var(--shadow-soft)] max-h-96 overflow-y-auto"
        >
            {children}
        </div>,
        document.body
    );
}

/** ---------- Custom Select ---------- */
function CustomSelect({ 
    value, 
    onChange, 
    placeholder = "Select Category",
    categories = [],
    loading = false 
}) {
    const [open, setOpen] = useState(false);
    const [hi, setHi] = useState(-1);
    const rootRef = useRef(null);
    const btnRef = useRef(null);
    const menuRef = useRef(null);

    // Convert categories array to options format if needed
    const options = categories.map(cat => {
        // Handle different category object structures
        if (typeof cat === 'object') {
            return {
                label: cat.label || cat.name || cat.title || 'Unnamed Category',
                value: cat.value || cat._id || cat.slug || 'uncategorized'
            };
        }
        // Handle string categories
        return {
            label: cat,
            value: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        };
    });

    const selectedLabel = value
        ? options.find((o) => o.value === value)?.label || placeholder
        : placeholder;

    // click-outside (ignore clicks inside menu portal)
    useEffect(() => {
        function onDoc(e) {
            const t = e.target;
            if (rootRef.current?.contains(t)) return;
            if (menuRef.current?.contains(t)) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const openMenu = () => {
        if (loading) return;
        setOpen(true);
        const idx = Math.max(0, options.findIndex((o) => o.value === value));
        setHi(idx);
    };

    const onKey = (e) => {
        if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openMenu();
            return;
        }
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHi((p) => (p + 1) % options.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHi((p) => (p - 1 + options.length) % options.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const opt = options[hi] ?? options[0];
            onChange?.(opt.value);
            setOpen(false);
            btnRef.current?.focus();
        } else if (e.key === "Escape") {
            setOpen(false);
            btnRef.current?.focus();
        }
    };

    return (
        <div ref={rootRef} className="relative w-full">
            <button
                ref={btnRef}
                type="button"
                onClick={openMenu}
                onKeyDown={onKey}
                disabled={loading}
                className="w-full h-12 md:h-[48px] inline-flex items-center justify-between px-4 bg-white text-[var(--color-text)] text-left focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-busy={loading}
            >
                <span className={value ? "" : "text-[var(--color-text)]/60"}>
                    {loading ? "Loading categories..." : selectedLabel}
                </span>
                <MdKeyboardArrowDown
                    size={20}
                    className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${loading ? "opacity-50" : ""}`}
                />
            </button>

            {/* Menu in portal; pass containerRef so outside-click ignores it */}
            <MenuPortal anchorRef={btnRef} open={open && !loading} containerRef={menuRef}>
                {options.length === 0 ? (
                    <div className="px-4 py-3 text-center text-gray-500">
                        {loading ? "Loading categories..." : "No categories available"}
                    </div>
                ) : (
                    <ul role="listbox" tabIndex={-1} onKeyDown={onKey}>
                        {/* "All Categories" option */}
                        <li
                            role="option"
                            aria-selected={!value}
                            onMouseEnter={() => setHi(-1)}
                            onClick={() => {
                                onChange?.("");
                                setOpen(false);
                                btnRef.current?.focus();
                            }}
                            className={`
                                px-4 py-2 cursor-pointer flex items-center justify-between text-[var(--color-text)]
                                ${hi === -1 ? "bg-[var(--color-primary)]/10" : "hover:bg-[var(--color-primary)]/10"}
                                ${!value ? "font-medium" : ""}
                            `}
                        >
                            All Categories
                            {!value && <MdCheck size={18} />}
                        </li>
                        
                        {options.map((opt, i) => {
                            const active = opt.value === value;
                            const highlighted = i === hi;
                            return (
                                <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={active}
                                    onMouseEnter={() => setHi(i)}
                                    onClick={() => {
                                        onChange?.(opt.value);
                                        setOpen(false);
                                        btnRef.current?.focus();
                                    }}
                                    className={`
                                        px-4 py-2 cursor-pointer flex items-center justify-between text-[var(--color-text)]
                                        ${highlighted ? "bg-[var(--color-primary)]/10" : "hover:bg-[var(--color-primary)]/10"}
                                        ${active ? "font-medium" : ""}
                                    `}
                                >
                                    {opt.label}
                                    {active && <MdCheck size={18} />}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </MenuPortal>
        </div>
    );
}

/** ---------- SearchBar (exported) ---------- */
export default function SearchBar({
    // Controlled (optional)
    category,
    query,
    onCategoryChange,
    onQueryChange,
    // Submit
    onSubmit,
    submitLabel = "Search",
    // Dynamic categories
    categories = [],
    loading = false
}) {
    const handleSubmit = (e) => {
        e?.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form onSubmit={handleSubmit} aria-label="Course search" className="w-full">
            {/* Unified wrapper */}
            <div
                className="
          flex flex-col md:flex-row w-full
          overflow-hidden rounded-xl bg-white
          shadow-[var(--shadow-soft)]
          ring-1 ring-gray-200 focus-within:ring-[var(--color-primary)]
          divide-y md:divide-y-0 md:divide-x divide-gray-200
        "
            >
                {/* Category */}
                <div className="md:w-[240px]">
                    <CustomSelect 
                        value={category} 
                        onChange={onCategoryChange} 
                        categories={categories}
                        loading={loading}
                        placeholder="All Categories"
                    />
                </div>

                {/* Query */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search for Courses"
                    className="flex-1 h-[48px] py-4 bg-white px-4 text-[var(--color-text)] placeholder-[var(--color-text)]/60 focus:outline-none"
                />

                {/* Submit */}
                <button
                    type="submit"
                    aria-label="Search"
                    title="Search"
                    className="md:w-[140px] h-12 md:h-[48px] inline-flex items-center justify-center gap-2 text-white transition"
                    style={{ background: "var(--color-primary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
                >
                    <MdSearch size={20} />
                    <span className="inline">{submitLabel}</span>
                </button>
            </div>
        </form>
    );
}