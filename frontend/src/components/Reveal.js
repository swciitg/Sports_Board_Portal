import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll reveal used throughout the redesign.
 *
 * The design file expresses these with CSS `animation-timeline: view()`, which only
 * runs in Chromium. framer-motion's whileInView gives the same fade-up everywhere and
 * respects prefers-reduced-motion.
 */
export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
