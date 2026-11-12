import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1] as const;

type StaggerContainerProps = Omit<
  HTMLMotionProps<'div'>,
  'animate' | 'initial' | 'transition' | 'variants' | 'viewport' | 'whileInView'
> & {
  staggerChildren?: number;
  delayChildren?: number;
  trigger?: 'inView' | 'mount';
  layout?: boolean;
};

export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  trigger = 'inView',
  layout = false,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = shouldReduceMotion === true;
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      {...props}
      variants={variants}
      initial={reduced ? 'visible' : 'hidden'}
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'inView' ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.15 }}
      layout={layout}
      transition={layout ? { layout: { duration: reduced ? 0 : 0.45, ease: easing } } : undefined}
    >
      {children}
    </motion.div>
  );
}
