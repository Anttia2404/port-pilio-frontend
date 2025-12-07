import { useEffect, useState } from "react";

export const useKonamiCode = () => {
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp", 
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ];
    
    let konamiIndex = 0;
    
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setSuccess(true);
          konamiIndex = 0;
          // Reset after 5 seconds
          setTimeout(() => setSuccess(false), 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  return success;
};
