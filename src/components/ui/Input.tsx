import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "@/utils/cn";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof textInputVariants>;

const TextInputElem = (
  { className, size, children, ...props }: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      className={cn(textInputVariants({ size, className }))}
      {...props}
    >
      {children}
    </input>
  );
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  TextInputElem,
);

const textInputVariants = cva(
  "hover:text-black rounded-full border-2 border-secondary-300 px-2 text-sm font-medium outline-offset-0 transition-colors hover:border hover:bg-secondary-200 hover:bg-opacity-20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
