import { motion, useScroll, useTransform } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  reverse?: boolean;
}

export function Parallax({ children, offset = 50, className = '', reverse = false }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [reverse ? -offset : offset, reverse ? offset : -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
