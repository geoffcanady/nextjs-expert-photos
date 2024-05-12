import { motion } from "framer-motion";

const pageTransitionVariants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

interface FadeInProps {
  children: React.ReactNode;
}

export default function FadeIn({ children }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      variants={pageTransitionVariants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
