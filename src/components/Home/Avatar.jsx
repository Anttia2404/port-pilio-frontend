import { motion } from "framer-motion";
export default function Avatar() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-8"
      >
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="w-40 h-40 rounded-full shadow-xl object-cover "
        />
      </motion.div>
    </>
  );
}
