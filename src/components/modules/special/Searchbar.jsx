"use client";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdCheck, MdSearch } from "react-icons/md";

/** ---------- Custom Select (internal) ---------- */
function CustomSelect({ value, onChange, placeholder = "Select Category" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    { label: "Technology", value: "tech" },
    { label: "Design", value: "design" },
    { label: "Business", value: "business" },
  ];
  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  // click-outside
  useEffect(() => {
    function onDoc(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          w-full flex justify-between items-center rounded-lg bg-white px-4 py-3
          text-[var(--color-text)] text-left transition border border-transparent
          focus:ring-2 focus:ring-[var(--color-primary)]
        "
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span className={value ? "" : "text-[var(--color-text)]/60"}>
          {selectedLabel}
        </span>
        <MdKeyboardArrowDown
          size={20}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className="
            absolute left-0 right-0 mt-1 bg-white rounded-lg z-30
            border border-gray-100 overflow-hidden
          "
          style={{ boxShadow: "var(--shadow-soft)" }}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                px-4 py-2 cursor-pointer hover:bg-[var(--color-primary)]/10
                flex items-center justify-between
                ${opt.value === value ? "bg-[var(--color-primary)]/10 font-medium" : ""}
              `}
            >
              {opt.label}
              {opt.value === value && <MdCheck size={18} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** ---------- SearchBar (exported) ---------- */
export default function SearchBar({
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onSubmit,
  submitLabel = "Search",
}) {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (typeof onSubmit === "function") onSubmit(e);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full rounded-xl p-1"
      aria-label="Course search"
    >
      <div className="flex flex-col gap-2 md:flex-row md:gap-3">
        {/* Category */}
        <div className="md:w-[240px]">
          <CustomSelect value={category} onChange={onCategoryChange} />
        </div>

        {/* Query */}
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="Search for Courses, Instructors"
          className="
            flex-1 rounded-lg bg-white px-4 py-3
            text-[var(--color-text)] outline-none transition
            placeholder-[var(--color-text)]/60
            focus:ring-2 focus:ring-[var(--color-primary)]
          "
          style={{ boxShadow: "var(--shadow-soft)" }}
        />

        {/* Submit */}
        <button
          type="submit"
          aria-label="Search"
          title="Search"
          className="
            inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3
            text-white transition md:w-[140px]
          "
          style={{ background: "var(--color-primary)", boxShadow: "var(--shadow-medium)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
        >
          <MdSearch size={20} />
          <span className="hidden md:inline">{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
