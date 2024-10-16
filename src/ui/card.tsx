"use client";

import { ElementType, ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ChildrenProps, StyleProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

// styles

const cardStyles = tv({
  slots: {
    base: "relative border border-tuna outline-none duration-200 rounded-[10px]",
    header: "p-5.5",
    body: "p-5.5",
    footer: "p-5.5",
    heading: "text-xl font-bold",
    buttons: "flex justify-end gap-x-5.5",
  },
  variants: {
    isContrasted: {
      true: "bg-smoke",
      false: "bg-shark",
    },
    isPressable: {
      true: "hover:border-platinum [&:active:not(:has(:focus))]:border-silver",
    },
  },
  defaultVariants: { isContrasted: false },
});

type CardStylesReturnType = ReturnType<typeof cardStyles>;

// props

interface PigmentCardProps extends HTMLAttributes<HTMLDivElement>, ChildrenProps, StyleProps, StyleSlotsToStyleProps<CardStylesReturnType> {
  isContrasted?: boolean;
  isPressable?: boolean;
  elementType?: ElementType;
}

// slots

interface CardSlotsType extends StyleSlotsToSlots<CardStylesReturnType> {}

const [CardSlotsProvider, useCardSlots] = createSlots<CardSlotsType>();

// component

function _Card(props: PigmentCardProps, ref: ForwardedRef<HTMLDivElement>) {
  const { elementType: ElementType = "div", isContrasted = false, isPressable, className, classNames, style, styles, ...restProps } = props;

  const styleSlots = cardStyles({ isContrasted, isPressable });

  return (
    <CardSlotsProvider value={{ styleSlots, classNames, styles }}>
      <ElementType
        ref={ref}
        className={styleSlots.base({ className: twMerge(classNames?.base, className) })}
        style={mergeProps(styles?.base, style)}
        {...restProps}
      />
    </CardSlotsProvider>
  );
}

const Card = forwardRef(_Card);

function _CardHeader(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <header
      ref={ref}
      className={styleSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
      {...restProps}
    />
  );
}

const CardHeader = forwardRef(_CardHeader);

function _CardBody(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <section
      ref={ref}
      className={styleSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
      {...restProps}
    />
  );
}

const CardBody = forwardRef(_CardBody);

function _CardFooter(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <footer
      ref={ref}
      className={styleSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
      {...restProps}
    />
  );
}

const CardFooter = forwardRef(_CardFooter);

function _CardHeading(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <h3
      ref={ref}
      className={styleSlots.heading({ className: twMerge(classNames?.heading, className) })}
      style={mergeProps(styles?.heading, style)}
      {...restProps}
    />
  );
}

const CardHeading = forwardRef(_CardHeading);

function _CardButtons(props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <div
      ref={ref}
      className={styleSlots.buttons({ className: twMerge(classNames?.buttons, className) })}
      style={mergeProps(styles?.buttons, style)}
      {...restProps}
    />
  );
}

const CardButtons = forwardRef(_CardButtons);

// exports

export { Card, CardHeader, CardBody, CardFooter, CardHeading, CardButtons, cardStyles };
export type { PigmentCardProps };
