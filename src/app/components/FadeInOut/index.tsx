import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  timing?: number;
}

export default function FadeInOut({ children, timing = 300 }: FadeInProps) {
  return (
    <AnimatePresence>
      {children ? (
        <motion.div
          key="fadeInOut"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: timing / 1000 }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
