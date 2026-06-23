"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const name = "SABOOJ MAROON SANGHA";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-maroon text-ivory"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 opacity-20 grain" />
          <div className="relative text-center">
            <motion.img
              src="/logo-mark.svg"
              alt=""
              className="mx-auto mb-8 size-20"
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="flex justify-center overflow-hidden font-display text-xl tracking-[0.28em] sm:text-3xl">
              {name.split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.42 + index * 0.045,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
            <motion.p
              className="mt-4 font-accent text-lg italic tracking-widest text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
            >
              Established 2019
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-48 origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.1, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
