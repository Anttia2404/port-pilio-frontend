import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
export default function Title() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-0 w-full"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span className="block text-gray-900 dark:text-gray-100">
            Xin chào, tôi là
          </span>

          <span className="  w-full h-30 flex flex-col justify-center">
            <TypeAnimation
              sequence={[
                "Võ Tấn Tài",
                2000,
                "Sinh viên Công nghệ thông tin - HCMUTE",
                1000,
                "Full-stack Developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent h-20"
            />
          </span>
        </h1>
      </motion.div>
    </>
  );
}
