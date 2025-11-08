import Demo from "./Demo";
import Title from "./Title";
import Link from "./Link";

import Avatar from "./Avatar";

const Hero = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      id="home"
    >
      <Avatar />
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
        <Title />
        <Demo />
        <Link />
      </div>
    </div>
  );
};

export default Hero;
