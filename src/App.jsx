import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import MechanicalDragon from "@/components/MechanicalDragon";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import { CursorProvider } from "@/context/CursorContext";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import confetti from "canvas-confetti";

function App({ children }) {
  const konamiActivated = useKonamiCode();

  useEffect(() => {
    if (konamiActivated) {
      // Confetti celebration!
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Show congratulations message
      setTimeout(() => {
        alert("🎉 Chúc mừng! Bạn đã khám phá được Easter Egg! 🎮\n\nKonami Code: ↑↑↓↓←→←→BA");
      }, 500);
    }
  }, [konamiActivated]);

  return (
    <CursorProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col relative">
        <ScrollProgress />
        <ParticleBackground />
        <MechanicalDragon />
        
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Skip to main content
        </a>
        
        <Navbar />
        <main id="main-content" className="grow relative">
          {children}
        </main>
        <Footer />
      </div>
    </CursorProvider>
  );
}

export default App;
