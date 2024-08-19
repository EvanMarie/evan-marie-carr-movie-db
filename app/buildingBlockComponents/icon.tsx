import React from "react";

interface IconProps {
  icon: React.ComponentType<{
    className?: string;
    tabIndex?: number;
    style?: React.CSSProperties;
  }>;
  containerClassName?: string;
  pos?: "absolute" | "relative" | "fixed" | "sticky" | "static" | "inherit";
  t?: string;
  l?: string;
  r?: string;
  b?: string;
  iconClassName?: string;
  hoverCursor?: string;
  w?: string;
  h?: string;
  rounded?: string;
  onClick?: () => void;
  tabIndex?: number;
}

export default function Icon({
  icon: IconComponent,
  tabIndex = -1,
  containerClassName = "",
  iconClassName = "",
  hoverCursor = "cursor-pointer",
  w = "w-fit",
  h = "h-fit",
  pos,
  t,
  l,
  r,
  b,
  rounded = "rounded-xs",
  onClick,
}: IconProps) {
  return (
    <div
      role="button"
      tabIndex={tabIndex}
      className={`${rounded} ${w} ${h} ${pos} ${t} ${b} ${r} ${l} ${containerClassName} ${hoverCursor}`}
      onClick={onClick}
      style={{ outline: "none" }}
    >
      <IconComponent
        className={`${rounded} ${iconClassName} ${hoverCursor}`}
        tabIndex={tabIndex}
        style={{ outline: "none" }}
      />
    </div>
  );
}
