import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useForm, ValidationError } from "@formspree/react";

export default function SendContact() {
  const [state, handleSubmit] = useForm("mqawzawv");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-center shadow-lg"
      >
        <h3 className="text-xl font-semibold">Gửi thành công!</h3>
        <p className="mt-2">
          Cảm ơn bạn đã liên hệ. Tôi sẽ trả lời sớm nhất có thể.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Họ và Tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
            placeholder="Nhập họ và tên của bạn"
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
            placeholder="example@domain.com"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Lời nhắn
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-none"
            placeholder="Nội dung tin nhắn của bạn..."
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <motion.button
          type="submit"
          disabled={state.submitting}
          className="group relative w-full px-6 py-4 bg-linear-to-r from-indigo-600 to-purple-600 
                       text-white rounded-lg font-medium overflow-hidden
                       before:absolute before:inset-0
                       before:bg-size-[200%_100%] before:animate-wave-gradient
                       before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]
                       hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)]
                       disabled:opacity-50 disabled:before:animate-none disabled:hover:shadow-none
                       transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative flex items-center justify-center space-x-2">
            <FiSend className="w-5 h-5" />
            <span>{state.submitting ? "Đang gửi..." : "Gửi tin nhắn"}</span>
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
}
