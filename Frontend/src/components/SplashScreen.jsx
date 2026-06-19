import { motion } from "motion/react";
import BrandLogo from "./BrandLogo";

function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#111111]"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex justify-center"
        >
          <BrandLogo size="xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-7 font-serif text-3xl font-bold italic text-white"
        >
          Krushna Sutariya
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 110 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-5 h-1 rounded-full bg-gradient-to-r from-orange-400 via-cyan-300 to-orange-400"
        />
      </div>
    </motion.div>
  );
}

export default SplashScreen;
