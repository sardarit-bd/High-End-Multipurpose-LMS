"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function TaskModal({ task, onClose }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    alert(`Task submitted: ${answer}`);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-3">{task?.title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {task?.description || "Please complete and submit this task."}
        </p>

        <textarea
          className="w-full border rounded-lg p-2 text-sm"
          rows="5"
          placeholder="Write your response here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Submit Task
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
