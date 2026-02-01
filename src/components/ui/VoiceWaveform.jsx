import { motion } from "framer-motion";

export const VoiceWaveform = () => (
  <div className="flex items-center justify-center gap-1 h-8 px-4">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-orange-400 rounded-full"
        animate={{
          height: [8, 24, 12, 20, 8],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
