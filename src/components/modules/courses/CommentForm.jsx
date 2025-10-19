import React from 'react'

export default function CommentForm() {
    return (
        <section className="bg-white rounded-[var(--radius-card)] shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
                Post a Comment
            </h2>

            <form className="space-y-4">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border px-4 py-2 bg-[var(--color-text)]/10 border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 text-sm bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                </div>

                {/* Subject */}
                <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-2 text-sm bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                />

                {/* Comments */}
                <textarea
                    placeholder="Comments"
                    rows={4}
                    className="w-full px-4 py-2 text-sm bg-[var(--color-text)]/10 border border-[var(--color-primary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
                ></textarea>

                {/* Submit */}
                <button
                    type="submit"
                    className="px-6 py-2 rounded-full text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-md font-semibold text-sm"
                >
                    Submit
                </button>
            </form>
        </section>
    )
}
