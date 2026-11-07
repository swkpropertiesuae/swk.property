'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export default function MotionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduce ? undefined : { y: [14, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
