import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function Demo() {
  const { cursorEnter, cursorLeave } = useCursor();
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        onMouseLeave={cursorLeave} // Ensure cursor resets when leaving button area
      >
        <NavLink
          to="/contact"
          className="px-8 py-3 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-300"
          onMouseEnter={cursorEnter}
          onMouseLeave={cursorLeave}
          onClick={cursorLeave} // Reset cursor on click/navigation
        >
          Liên hệ
        </NavLink>
        <NavLink
          to="/projects"
          className="px-8 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 rounded-full font-medium hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
          onMouseEnter={cursorEnter}
          onMouseLeave={cursorLeave}
          onClick={cursorLeave} // Reset cursor on click/navigation
        >
          Xem dự án
        </NavLink>
      </motion.div>
    </>
  );
}
