'use client';

import { motion, Variants } from 'framer-motion';

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animated component wrapper
export const AnimateInView = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return motion.div({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-100px' },
    variants: staggerContainer,
    className,
    children
  });
};

// Animated text component
export const AnimatedText = ({ text, className = '' }: { text: string, className?: string }) => {
  return motion.span({
    className: 'inline-block overflow-hidden',
    children: motion.span({
      className: 'inline-block ' + className,
      variants: fadeIn,
      children: text
    })
  });
};
