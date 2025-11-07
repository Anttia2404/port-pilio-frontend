import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  // สถานะสำหรับฟอร์มติดต่อ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // จำลองการส่งข้อมูล
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ข้อมูลการติดต่อ
  const contactInfo = [
    {
      icon: FiMail,
      label: "อีเมล",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      icon: FiPhone,
      label: "เบอร์โทรศัพท์",
      value: "(+66) 99-999-9999",
      href: "tel:+66999999999",
    },
    {
      icon: FiMapPin,
      label: "ที่อยู่",
      value: "กรุงเทพมหานคร, ประเทศไทย",
      href: "https://goo.gl/maps/yourLocation",
    },
  ];

  return (
    <section
      className="min-h-screen py-28 bg-gray-50 dark:bg-neutral-900"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* หัวข้อส่วน */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              ติดต่อฉัน
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ข้อมูลการติดต่อ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-6">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {label}
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ฟอร์มติดต่อ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
                  placeholder="กรุณากรอกชื่อของคุณ"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white"
                  placeholder="example@domain.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  ข้อความ
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-white resize-none"
                  placeholder="กรุณากรอกข้อความที่ต้องการส่ง"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                         text-white rounded-lg font-medium overflow-hidden
                         before:absolute before:inset-0
                         before:bg-[length:200%_100%] before:animate-wave-gradient
                         before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]
                         hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)]
                         disabled:opacity-50 disabled:before:animate-none disabled:hover:shadow-none
                         transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center space-x-2">
                  <FiSend className="w-5 h-5" />
                  <span>{isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}</span>
                </div>
              </motion.button>

              {/* แสดงผลการส่งข้อความ */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus === "success"
                      ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  }`}
                >
                  {submitStatus === "success"
                    ? "ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อ"
                    : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
