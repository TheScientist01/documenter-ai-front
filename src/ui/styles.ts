import { tv } from "tailwind-variants";

export const isDisabledVariants = {
  isDisabled: {
    true: "opacity-50 cursor-not-allowed",
  },
};

export const isFocusVisibleVariants = {
  isFocusVisible: {
    true: "outline outline-2 outline-offset-2 outline-coral z-10",
    false: "outline-none",
  },
};

export const radiusVariants = {
  radius: {
    sm: "rounded-lg",
    md: "rounded-[10px]",
    lg: "rounded-2xl",
    full: "rounded-full",
    none: "rounded-none",
  },
};

export const smallRadiusVariants = {
  radius: {
    sm: "rounded-md",
    md: "rounded-[5px]",
    lg: "rounded-xl",
    full: "rounded-full",
    none: "rounded-none",
  },
};

export const variantColorRadiusStyles = tv({
  base: "relative flex items-center justify-center min-w-max whitespace-nowrap overflow-hidden z-0 duration-200",
  variants: {
    variant: {
      solid: "text-black",
      soft: "bg-opacity-10",
      light: "bg-opacity-0",
      bordered: "bg-opacity-0 border border-opacity-50",
      faded: "bg-woodsmoke border border-tuna",
      gradient:
        "bg-opacity-0 after:opacity-20 after:absolute after:inset-x-0 after:-z-10 after:aspect-square after:scale-125 after:duration-200 after:bg-gradient-to-r after:animate-[rotate360deg_5s_infinite_linear]",
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      error: "",
    },
    isHovered: { true: "" },
    isPressed: { true: "scale-100" },
    ...radiusVariants,
    ...isDisabledVariants,
    ...isFocusVisibleVariants,
  },
  compoundVariants: [
    // solid & soft & light & bordered & gradient
    {
      variant: ["solid", "soft", "light", "bordered", "gradient"],
      color: "default",
      className: "bg-white",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "gradient"],
      color: "primary",
      className: "bg-coral",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "gradient"],
      color: "secondary",
      className: "bg-sea",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "gradient"],
      color: "success",
      className: "bg-weed",
    },
    {
      variant: ["solid", "soft", "light", "bordered", "gradient"],
      color: "error",
      className: "bg-fuzzy",
    },
    // soft & light & bordered & faded & gradient
    {
      variant: ["soft", "light", "bordered", "faded", "gradient"],
      color: "default",
      className: "text-white",
    },
    {
      variant: ["soft", "light", "bordered", "faded", "gradient"],
      color: "primary",
      className: "text-coral",
    },
    {
      variant: ["soft", "light", "bordered", "faded", "gradient"],
      color: "secondary",
      className: "text-sea",
    },
    {
      variant: ["soft", "light", "bordered", "faded", "gradient"],
      color: "success",
      className: "text-weed",
    },
    {
      variant: ["soft", "light", "bordered", "faded", "gradient"],
      color: "error",
      className: "text-fuzzy",
    },
    // bordered
    {
      variant: ["bordered"],
      color: "default",
      className: "border-white",
    },
    {
      variant: ["bordered"],
      color: "primary",
      className: "border-coral",
    },
    {
      variant: ["bordered"],
      color: "secondary",
      className: "border-sea",
    },
    {
      variant: ["bordered"],
      color: "success",
      className: "border-weed",
    },
    {
      variant: ["bordered"],
      color: "error",
      className: "border-fuzzy",
    },
    // gradient
    {
      variant: ["gradient"],
      color: "default",
      className: "after:from-white after:to-white/20",
    },
    {
      variant: ["gradient"],
      color: "primary",
      className: "after:from-coral after:to-tuna",
    },
    {
      variant: ["gradient"],
      color: "secondary",
      className: "after:from-sea after:to-sea/20",
    },
    {
      variant: ["gradient"],
      color: "success",
      className: "after:from-weed after:to-weed/20",
    },
    {
      variant: ["gradient"],
      color: "error",
      className: "after:from-fuzzy after:to-fuzzy/20",
    },

    // is hovered
    { variant: "solid", isHovered: true, className: "bg-opacity-90" },
    { variant: "soft", isHovered: true, className: "bg-opacity-20" },
    { variant: "light", isHovered: true, className: "bg-opacity-10" },
    { variant: "bordered", isHovered: true, className: "bg-opacity-10" },
    { variant: "faded", isHovered: true, className: "border-platinum" },
    { variant: "gradient", isHovered: true, className: "[&_*]:text-black text-black bg-opacity-100 after:opacity-0" },
  ],
});

export const segmentStyles = tv({
  base: "text-white outline-none [caret-color:transparent;]",
  variants: {
    size: {
      xs: "py-0.5 px-1",
      sm: "py-0.5 px-1",
      md: "py-1 px-1.5",
      lg: "py-1.5 px-2",
    },
    isFocused: { true: "bg-white text-black" },
    ...smallRadiusVariants,
  },
  defaultVariants: { size: "md", radius: "md" },
});
