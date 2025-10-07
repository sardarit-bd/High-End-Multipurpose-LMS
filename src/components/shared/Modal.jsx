/* Reusable Modal */
import { motion } from "framer-motion";
function Modal({ children, onClose, title }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="bg-white w-full max-w-xl rounded-md shadow-lg p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-[var(--color-primary)]">✕</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
export default Modal;