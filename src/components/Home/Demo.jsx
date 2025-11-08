import { NavLink } from "react-router";
import { motion } from "framer-motion";
export default function Demo() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className=" flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <NavLink
          to="/contact"
          className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Liên hệ
        </NavLink>
        <NavLink
          to="/projects"
          className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Xem dự án
        </NavLink>
      </motion.div>
    </>
  );
}
