import { MouseEventHandler } from "react";
import { SpinnerSmall } from "./spinner";
import Icon from "./icon";
import Flex from "./flex";
import Tooltip, { TooltipPlacement } from "./tooltip";
import { motion } from "framer-motion";

export default function IconButton({
  icon,
  containerClassName,
  iconClassName,
  onClick,
  ref,
  htmlType = "button",
  isLoading,
  isDisabled,
  type = "normal",
  tooltipPlacement = "bottom",
  label,
  style,
  tabIndex,
}: {
  containerClassName?: string;
  iconClassName?: string;
  icon: React.ComponentType<{ className?: string }>;
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  label?: string;
  tooltipPlacement?: TooltipPlacement;
  isDisabled?: boolean;
  htmlType?: "button" | "submit" | "reset";
  to?: string;
  style?: React.CSSProperties;
  tabIndex?: number;

  type?:
    | "normal"
    | "smallNormal"
    | "largeNormal"
    | "negative"
    | "smallNegative"
    | "largeNegative"
    | "unstyled"
    | "smallUnstyled"
    | "largeUnstyled";
}) {
  const buttonClass =
    type === "normal"
      ? "normalButtonStyles"
      : type === "smallNormal"
      ? "smallButtonStyles"
      : type === "largeNormal"
      ? "largeButtonStyles"
      : type === "negative"
      ? "negativeButtonStyles"
      : type === "smallNegative"
      ? "smallNegativeButtonStyles"
      : type === "largeNegative"
      ? "largeNegativeButtonStyles"
      : type === "unstyled"
      ? "unstyledButtonStyles"
      : type === "smallUnstyled"
      ? "smallUnstyledButtonStyles"
      : type === "largeUnstyled"
      ? "largeUnstyledButtonStyles"
      : "normalButtonStyles";

  const displayIconSize =
    type === "normal"
      ? "text-[2.5vh]"
      : type === "smallNormal"
      ? "text-[1.6vh]"
      : type === "largeNormal"
      ? "text-[4vh]"
      : type === "negative"
      ? "text-[2.5vh] "
      : type === "smallNegative"
      ? "text-[1.6vh]"
      : type === "largeNegative"
      ? "text-[5vh]"
      : type === "unstyled"
      ? "text-[2.5vh]"
      : type === "smallUnstyled"
      ? "text-[1.6vh]"
      : type === "largeUnstyled"
      ? "text-[3.5vh]"
      : "text-[1.6vh]";

  const iconButtonSize =
    type === "normal"
      ? "w-[3.5vh] h-[3.5vh]"
      : type === "smallNormal"
      ? "w-[3vh] h-[3vh]"
      : type === "largeNormal"
      ? " w-[6vh] h-[6vh]"
      : type === "negative"
      ? " w-[3.5vh] h-[3.5vh]"
      : type === "smallNegative"
      ? "w-[3vh] h-[3vh]"
      : type === "largeNegative"
      ? " w-[6vh] h-[6vh]"
      : type === "unstyled"
      ? "w-[3.5vh] h-[3.5vh]"
      : type === "smallUnstyled"
      ? "w-[3vh] h-[3vh]"
      : type === "largeUnstyled"
      ? " w-[6vh] h-[6vh]"
      : "text-[2vh] w-[3vh] h-[3vh]";

  return (
    <Tooltip label={label} placement={tooltipPlacement}>
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        type={htmlType}
        ref={ref}
        className={`${containerClassName}`}
        whileTap={{ rotate: 5, scale: 0.8, transition: { duration: 0.3 } }}
      >
        <Flex className={` ${iconButtonSize} ${buttonClass} `} style={style}>
          {isLoading ? (
            <SpinnerSmall />
          ) : (
            <Icon
              icon={icon}
              iconClassName={`${displayIconSize} ${iconClassName}`}
              containerClassName={`flex w-full h-full justify-center items-center hover:cursor-pointer`}
            />
          )}
        </Flex>
      </motion.button>
    </Tooltip>
  );
}
