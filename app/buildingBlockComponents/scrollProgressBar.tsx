import { useEffect, useRef, useState, MutableRefObject } from "react";
import { motion } from "framer-motion";
import FlexFull from "./flexFull";

interface ScrollProgressBarProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  position?: string;
  color?: string;
  height?: string;
  trackColor?: string;
  rounded?: string;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  containerRef,
  position = "absolute inset-0",
  color = "bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400",
  height = "h-0.6vh",
  trackColor = "bg-col-950",
  rounded = "rounded-0.7vh",
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      return () =>
        containerRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef]);

  return (
    <FlexFull
      className={`${position} h-fit ${trackColor} insetShadowSm ${rounded} z-50`}
    >
      <motion.div
        ref={scrollRef}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        className={`${height} rounded-l-none ${color} ${rounded}`}
      />
    </FlexFull>
  );
};

export default ScrollProgressBar;
