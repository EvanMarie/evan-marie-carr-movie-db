import { motion } from "framer-motion";

interface AnimateInPlaceTextProps {
  text: string;
  containerClassName?: string;
  textClassName?: string;
  isWave?: boolean;
  isScale?: boolean;
  textSize?: string;
  textColor?: string;
  textShadow?: string;
  textSpacing?: string;
  letterDelay?: number;
  waveSize?: number;
  scaleSize?: number;
  fontStyle?: string;
  damping?: number;
  stiffness?: number;
  gradient?: string;
}

export default function AnimatedText({
  text,
  containerClassName,
  isWave,
  isScale,
  textSize = "text-3.5vh sm:text-4vh ",
  textColor = "text-yellow-200 text-stroke-6-w00",
  textShadow = "textFogXs",
  textSpacing = "tracking-wider md:tracking-widest",
  fontStyle = "blockLetters",
  gradient,
  letterDelay = 0.08,
  waveSize = -12,
  scaleSize = 1.3,
  textClassName,
  damping = 3,
  stiffness = 120,
}: AnimateInPlaceTextProps) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const child = {
    visible: {
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: damping,
        stiffness: stiffness,
      },
    },
    hover: (i: number) => ({
      y: isWave ? [0, waveSize, 0] : 0,
      scale: isScale ? [1, scaleSize, 1] : 1,
      transition: {
        duration: 0.6,
        delay: i * letterDelay,
        ease: "easeInOut",
      },
    }),
  };

  const gradientClassName = gradient ? `${gradient}` : "";
  const gradientStyle = gradient
    ? {
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {};

  return (
    <motion.div
      className={`inline-block ${containerClassName}`}
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          custom={index}
          className={`inline-block ${textSize} ${textColor} ${textShadow} ${fontStyle} ${textSpacing} ${textClassName} ${gradientClassName}`}
          style={{ ...gradientStyle, overflow: "visible" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
