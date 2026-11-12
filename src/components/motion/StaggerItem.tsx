import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const easing = [0.22, 1, 0.36, 1] as const;

type StaggerItemProps = {
  as?: 'div' | 'article';
  children: ReactNode;
  className?: string;
  layout?: boolean;
};

export function StaggerItem({ as = 'div', children, className, layout = false }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion === true;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.7, ease: easing },
    },
  };
  const MotionElement = as === 'article' ? motion.article : motion.div;

  return (
    <MotionElement
      className={className}
      variants={variants}
      layout={layout}
      exit={{ opacity: 0, y: reduced ? 0 : 12, transition: { duration: reduced ? 0 : 0.25, ease: easing } }}
    >
      {children}
    </MotionElement>
  );
}
