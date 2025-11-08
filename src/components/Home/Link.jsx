import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
export default function Link() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 flex justify-center space-x-8"
      >
        {[
          {
            Icon: FiGithub,
            href: "https://github.com/Anttia2404",
            label: "GitHub",
          },
          {
            Icon: FiLinkedin,
            href: "https://www.linkedin.com/in/t%E1%BA%A5n-t%C3%A0i-v%C3%B5-0549b4385/",
            label: "LinkedIn",
          },
          {
            Icon: FiMail,
            href: "https://mail.google.com/mail/u/0/?fs=1&to=tanloc01293@gmail.com&tf=cm",
            label: "Email",
          },
        ].map(({ Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 text-gray-600 hover:text-indigo-600 transition-all duration-300 rounded-full hover:bg-indigo-50 hover:shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={28} />
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}
