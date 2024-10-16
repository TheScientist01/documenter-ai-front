"use client";

import { useObjectRef } from "@react-aria/utils";
import { ElementType, ForwardedRef, forwardRef } from "react";
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
} from "react-aria";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { variantColorRadiusStyles } from "./styles";
import {
  ChildrenProps,
  ColorProps,
  ContentProps,
  RadiusProps,
  Sizes,
  StyleProps,
  VariantProps,
} from "./types";

import { Spinner } from "./spinner";

// styles

const buttonStyles = (isSizeableIcon: boolean) => {
  return tv({
    extend: variantColorRadiusStyles,
    base: "",
    variants: {
      size: {
        xs: `h-[22px] gap-x-0.5 px-3.5 text-[10px] font-bold uppercase ${
          !isSizeableIcon && "[&_svg]:size-3.5"
        }`,
        sm: `h-[32px] gap-x-2 px-4 text-[12px] font-bold uppercase ${
          !isSizeableIcon && "[&_svg]:size-4"
        }`,
        md: `h-[40px] gap-x-2.5 px-5 text-[16px] ${
          !isSizeableIcon && "[&_svg]:size-5"
        }`,
        lg: `h-[44px] gap-x-3 px-6 text-[14px] font-bold ${
          !isSizeableIcon && "[&_svg]:size-6"
        }`,
        xl: `h-[48px] gap-x-3.5 px-7 text-[14px] font-bold uppercase ${
          !isSizeableIcon && "[&_svg]:size-7"
        }`,
      },
      isIconOnly: { true: "" },
      isLoading: { true: "!text-transparent" },
    },
    compoundVariants: [
      { size: "sm", isIconOnly: true, className: "px-0.5" },
      { size: "sm", isIconOnly: true, className: "px-2" },
      { size: "md", isIconOnly: true, className: "px-2.5" },
      { size: "lg", isIconOnly: true, className: "px-3" },
      { size: "xl", isIconOnly: true, className: "px-3.5" },
    ],
  });
};

// props

interface PigmentButtonProps
  extends AriaButtonProps,
    VariantProps,
    ColorProps,
    RadiusProps,
    ContentProps,
    ChildrenProps,
    StyleProps {
  isSizeableIcon?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  size?: Sizes | "xs" | "xl";
}

// component

function _Button(
  props: PigmentButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "md",
    startContent,
    endContent,
    isLoading,
    isDisabled: disabled,
    isSizeableIcon = false,
    isIconOnly,
    children,
    className,
    style,
    elementType: Component = "button" as ElementType,
    ...restProps
  } = props;

  const isDisabled = disabled || isLoading;

  const objRef = useObjectRef(ref);
  const { buttonProps, isPressed } = useButton(
    { ...restProps, isDisabled },
    objRef
  );
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Component
      ref={objRef}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      target={props.target}
      href={props.href}
      className={buttonStyles(isSizeableIcon)({
        variant,
        color,
        size,
        radius,
        isIconOnly,
        isLoading,
        isHovered,
        isPressed,
        isDisabled,
        isFocusVisible,
        className,
      })}
      style={style}
    >
      {isLoading && (
        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            variant === "solid" && "invert"
          )}
        >
          <Spinner
            size={size}
            color={variant === "solid" ? "default" : color}
          />
        </div>
      )}

      {startContent}
      {children}
      {endContent}
    </Component>
  );
}

const Button = forwardRef(_Button);

// exports

export { Button };
export type { PigmentButtonProps };
