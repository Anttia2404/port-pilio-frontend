import { motion } from "framer-motion";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { useForm, ValidationError } from "@formspree/react";

export default function SendContact() {
  const [state, handleSubmit] = useForm("mqawzawv");

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-center shadow-lg border border-green-100 dark:border-green-800"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiSend className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Gửi thành công!</h3>
        <p className="text-lg opacity-90">
          Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-neutral-800 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Gửi tin nhắn cho tôi
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1"
          >
            Họ và Tên
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
                       bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-white
                       transition-all duration-300"
              placeholder="Nhập họ và tên của bạn"
            />
          </div>
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 ml-1"
          />
        </div>

        <div className="relative group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMail className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                       bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-white
                       transition-all duration-300"
              placeholder="example@domain.com"
            />
          </div>
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 ml-1"
          />
        </div>

        <div className="relative group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1"
          >
            Lời nhắn
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-4 pointer-events-none">
              <FiMessageSquare className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                       bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-white resize-none
                       transition-all duration-300"
              placeholder="Nội dung tin nhắn của bạn..."
            />
          </div>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm mt-1 ml-1"
          />
        </div>

        <motion.button
          type="submit"
          disabled={state.submitting}
          className="group relative w-full px-6 py-4 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 
                       text-white rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-orange-500/30
                       hover:shadow-orange-500/50 hover:scale-[1.02]
                       disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none
                       transition-all duration-300"
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <span>{state.submitting ? "Đang gửi..." : "Gửi tin nhắn"}</span>
            <FiSend className={`w-5 h-5 ${state.submitting ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'}`} />
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
}
