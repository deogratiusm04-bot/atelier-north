import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1] as const;

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealOnScrollProps = Omit<
  HTMLMotionProps<'div'>,
  'animate' | 'initial' | 'transition' | 'viewport' | 'whileInView'
> & {
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
};

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  ...props
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsets[direction];
  const reduced = shouldReduceMotion === true;

  return (
    <motion.div
      {...props}
      initial={reduced ? false : {
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
