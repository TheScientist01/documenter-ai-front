"use client";

import { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

import { ColorProps, Sizes, StyleProps } from "./types";

// styles

const spinnerStyles = tv({
  base: "animate-spin rounded-full border border-t-transparent border-r-transparent",
  variants: {
    color: {
      default: "border-b-white border-l-white",
      primary: "border-b-coral border-l-coral",
      secondary: "border-b-sea border-l-sea",
      success: "border-b-weed border-l-weed",
      error: "border-b-fuzzy border-l-fuzzy",
    },
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    },
  },
});

// props

interface PigmentSpinnerProps extends ColorProps, StyleProps {
  size?: Sizes | "xs" | "xl";
}

// component

function _Spinner(
  props: PigmentSpinnerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { color = "default", size = "md", className, style } = props;

  return (
    <div
      ref={ref}
      className={spinnerStyles({ color, size, className })}
      style={style}
    />
  );
}

const Spinner = forwardRef(_Spinner);

// exports

export { Spinner };
export type { PigmentSpinnerProps };
