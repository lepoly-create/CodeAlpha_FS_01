import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[0.25rem] border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#e59b22] text-white hover:bg-[#d97706] shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] font-semibold",
        secondary:
          "bg-[#1a1c20] text-white hover:bg-[#22252a] hover:border-[#e59b22]/50 border border-transparent font-medium",
        outline:
          "border-border bg-card text-foreground shadow-xs hover:bg-[#f1f3ff] hover:border-[#e59b22]/50 hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "hover:bg-[#e9edff] text-foreground hover:text-[#835500] aria-expanded:bg-[#e9edff] dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-[#835500] underline-offset-4 hover:underline hover:text-[#e59b22]",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 in-data-[slot=button-group]:rounded-[0.25rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[0.25rem] px-2 text-xs in-data-[slot=button-group]:rounded-[0.25rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[0.25rem] px-2.5 in-data-[slot=button-group]:rounded-[0.25rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-4 rounded-[0.25rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        icon: "size-9 rounded-[0.25rem]",
        "icon-xs":
          "size-6 rounded-[0.25rem] in-data-[slot=button-group]:rounded-[0.25rem] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[0.25rem] in-data-[slot=button-group]:rounded-[0.25rem]",
        "icon-lg": "size-10 rounded-[0.25rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
