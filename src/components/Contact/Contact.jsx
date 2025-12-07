import { Title } from "./Title";
import Information from "./Information";
import SendContact from "./SendContact";

const Contact = () => {
  return (
    <section
      className="min-h-screen py-28 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-red-950/30 dark:to-orange-950/30 relative overflow-hidden"
      id="contact"
    >
      {/* Background Pattern - Orange-Red Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Title />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Information />
          <SendContact />
        </div>
      </div>
    </section>
  );
};

export default Contact;
