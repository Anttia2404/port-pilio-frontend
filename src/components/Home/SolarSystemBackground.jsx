import { motion } from "framer-motion";

export default function SolarSystemBackground() {
  // Planet data with stylized sizes and orbital speeds
  const planets = [
    { name: "Mercury", size: 8, color: "#8C7853", orbitRadius: 80, duration: 15 },
    { name: "Venus", size: 12, color: "#FFC649", orbitRadius: 110, duration: 20 },
    { name: "Earth", size: 12, color: "#4A90E2", orbitRadius: 140, duration: 25 },
    { name: "Mars", size: 10, color: "#E27B58", orbitRadius: 170, duration: 30 },
    { name: "Jupiter", size: 20, color: "#C88B3A", orbitRadius: 220, duration: 40 },
    { name: "Saturn", size: 18, color: "#FAD5A5", orbitRadius: 270, duration: 50 },
    { name: "Uranus", size: 14, color: "#4FD0E7", orbitRadius: 310, duration: 60 },
    { name: "Neptune", size: 14, color: "#4166F5", orbitRadius: 350, duration: 70 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-black/20">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Solar System Container - Centered and moved up */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }}>
        {/* Sun */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 2 }}
        >
          <div className="relative">
            {/* Sun glow */}
            <div className="absolute inset-0 w-16 h-16 bg-yellow-400/30 rounded-full blur-xl" />
            <div className="absolute inset-0 w-16 h-16 bg-orange-400/20 rounded-full blur-2xl animate-pulse" />
            
            {/* Sun core */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/50 to-transparent rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Planets with Orbits */}
        {planets.map((planet) => (
          <div key={planet.name} style={{ zIndex: 3 }}>
            {/* Orbit path */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full pointer-events-none"
              style={{
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2,
              }}
            />

            {/* Orbiting planet */}
            <motion.div
              className="absolute top-1/2 left-1/2"
              style={{
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2,
                marginLeft: -planet.orbitRadius,
                marginTop: -planet.orbitRadius,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: planet.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: planet.size,
                  height: planet.size,
                  backgroundColor: planet.color,
                  top: 0,
                  left: "50%",
                  marginLeft: -planet.size / 2,
                }}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.3 }}
              >
                {/* Planet shine */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full"
                  style={{ transform: "translate(-20%, -20%)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
