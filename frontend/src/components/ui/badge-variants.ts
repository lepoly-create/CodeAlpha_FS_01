import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#e59b22] text-white [a]:hover:bg-[#d97706] font-semibold",
        secondary: "bg-[#1a1c20] text-white [a]:hover:bg-[#22252a] font-medium",
        tertiary: "bg-[#0053db] text-white [a]:hover:bg-[#2563eb] font-semibold",
        destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-[#835500] underline-offset-4 hover:underline hover:text-[#e59b22]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
