import { Title } from "./Title";
import Information from "./Information";
import SendContact from "./SendContact";

const Contact = () => {
  return (
    <section
      className="min-h-screen py-28 bg-gray-50 dark:bg-neutral-900"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
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
