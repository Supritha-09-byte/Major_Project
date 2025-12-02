import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 hover:scale-105",
        destructive:
          "bg-gradient-to-br from-destructive to-red-600 text-destructive-foreground shadow-lg shadow-destructive/40 hover:shadow-xl hover:shadow-destructive/50 hover:scale-105",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-primary/5 hover:border-primary hover:shadow-md hover:scale-105",
        secondary:
          "bg-gradient-to-br from-secondary via-secondary to-accent text-secondary-foreground shadow-lg shadow-secondary/40 hover:shadow-xl hover:shadow-secondary/50 hover:scale-105",
        ghost: "hover:bg-primary/10 hover:text-primary rounded-xl",
        link: "text-primary underline-offset-4 hover:underline hover:text-secondary",
        gradient: "bg-gradient-primary text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 hover:scale-105",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
