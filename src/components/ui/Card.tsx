import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

export interface CardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cardVariants> {
  icon?: React.ReactNode;
  useArrow?: "left" | "right";
}

const Card = () => {
  return <div>Card</div>;
};

export default Card;

const cardVariants = cva(
  "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "text-black bg-primary hover:bg-primary/80",
        destructive:
          "bg-system-danger-500 text-secondary-200 hover:bg-system-danger-500/80",
        secondary:
          "hover:text-black border-2 border-secondary-100 hover:border-none hover:bg-secondary-100/20",
        tertiary: "text-black  underline-offset-2 hover:bg-secondary-100/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      layouts: {
        iconText: "flex-row gap-2",
        textIcon: "flex-row-reverse gap-2",
        icon: "items-center justify-center",
        text: "items-center justify-center underline hover:no-underline",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
