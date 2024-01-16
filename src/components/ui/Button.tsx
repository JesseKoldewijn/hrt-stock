import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  useArrow?: boolean;
}

const ButtonElem = (
  {
    className,
    variant,
    layout,
    size,
    useArrow,

    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const { children, icon, ...rest } = props;

  const Icon = () => {
    switch (layout) {
      case "iconText":
        return <>{useArrow ? <FaArrowLeft /> : icon}</>;
      case "textIcon":
        return <>{useArrow ? <FaArrowRight /> : icon}</>;
      default:
        return <>{icon}</>;
    }
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...rest}
    >
      {layout === "iconText" && !icon ? (
        <span className="flex items-center justify-center">
          <Icon />
        </span>
      ) : (
        <span className="flex items-center justify-center">{icon}</span>
      )}
      {children}
      {layout === "textIcon" && !icon ? (
        <span className="flex items-center justify-center">
          <Icon />
        </span>
      ) : (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </button>
  );
};

const LinkButtonElem = (
  {
    className,
    variant,
    layout,
    size,
    useArrow,

    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) => {
  const { children, icon, ...rest } = props;

  const Icon = () => {
    if (layout === "text") return null;

    switch (layout) {
      case "iconText":
        if (!useArrow) return icon;
        return <FaArrowLeft />;
      case "textIcon":
        if (!useArrow) return icon;
        return <FaArrowRight />;
      default:
        return <>{icon}</>;
    }
  };

  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {layout === "iconText" && (
        <span className="flex items-center justify-center">
          <Icon />
        </span>
      )}
      {children}
      {layout === "textIcon" && (
        <span className="flex items-center justify-center">
          <Icon />
        </span>
      )}
    </Link>
  );
};

export const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  ButtonProps & { href: string }
>(LinkButtonElem);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonElem,
);

const buttonVariants = cva(
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
      layout: {
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
