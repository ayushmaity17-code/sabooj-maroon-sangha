import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-maroon px-7 py-3.5 text-white shadow-lg shadow-maroon/15 hover:bg-[#6B2738]",
        gold: "bg-gold px-7 py-3.5 text-charcoal shadow-lg shadow-gold/20 hover:bg-[#D3B16F]",
        outline:
          "border border-charcoal/15 bg-white/5 px-7 py-3.5 text-current backdrop-blur hover:border-gold hover:text-gold",
        ghost: "px-4 py-2 hover:bg-charcoal/5",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-5",
        lg: "h-14 px-8 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
