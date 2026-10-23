import { cn } from "cn";
import * as React from "react";
import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    root: [
      "group relative z-[500] inline-flex cursor-pointer select-none",
      "h-[clamp(3.65rem,12vw,4.6875rem)] w-[16.25rem] max-w-[calc(100vw_-_2.5rem)]",
      "appearance-none rounded-full border-0 bg-transparent p-0",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(0,0,0,0.6)]",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    surface: [
      "relative flex h-full w-full items-center justify-center",
      "gap-[clamp(0.6rem,3vw,1rem)] rounded-full px-[0.8rem]",
      "border border-double border-[rgba(51,51,51,0.08)] bg-[rgba(0,0,0,0.02)]",
      "shadow-[inset_2px_-2px_1px_-1px_rgba(255,255,255,0.9),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.9),inset_6px_-6px_1px_-6px_rgba(255,255,255,0.55),inset_-6px_6px_1px_-6px_rgba(255,255,255,0.55),inset_0_0_2px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.2)]",
      "backdrop-blur-[2px] [filter:brightness(0.9)_contrast(3)]",
      "transition-[background-color,transform] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "before:pointer-events-none before:absolute before:left-1/2 before:top-[35%] before:z-[1] before:h-[calc(100%_-_16px)] before:w-[calc(100%_-_16px)] before:-translate-x-1/2 before:rounded-[inherit] before:border before:border-[rgba(0,0,0,0.9)] before:blur-[8px] before:content-['']",
      "after:pointer-events-none after:absolute after:inset-0 after:z-[501] after:rounded-[inherit] after:bg-[linear-gradient(45deg,rgba(255,255,255,0.8)_0%,transparent_15%,transparent_85%,rgba(255,255,255,0.8)_100%)] after:blur-[7px] after:content-['']",
      "group-hover:-translate-y-[3px] group-hover:bg-transparent group-active:translate-y-0 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-active:scale-100",
    ],
    text: [
      "font-[system-ui,-apple-system,sans-serif] text-[clamp(1.0625rem,4vw,1.5625rem)]",
      "font-normal leading-none text-[#3e3e3e]",
      "[filter:drop-shadow(0_25px_3px_rgba(102,102,102,0.15))]",
      "group-active:text-black",
    ],
    icon: [
      "grid size-[clamp(2rem,7vw,2.5rem)] shrink-0 place-items-center rounded-full",
      "bg-[#3e3e3e] text-[#f5f5f5] shadow-[0_0_6px_rgba(0,0,0,0.3)]",
      "transition-transform duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]",
      "group-hover:scale-110 group-active:scale-[0.94]",
      "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100",
    ],
    glyph: [
      "block h-[40%] w-[40%] fill-current",
      "[filter:drop-shadow(0_25px_3px_rgba(102,102,102,0.2))]",
    ],
    overlay: [
      "pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[calc(100%_-_9px)] w-[calc(100%_-_9px)]",
      "-translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.2)] blur-[1px]",
    ],
  },
});

const styles = button();

type ButtonProps = React.ComponentProps<"button">;

function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(styles.root(), className)}
      {...props}
    >
      <span className={styles.surface()}>
        <span className={styles.text()}>{children}</span>
        <span className={styles.icon()} aria-hidden="true">
          <svg
            className={styles.glyph()}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <path d="M779.180132 473.232045 322.354755 16.406668c-21.413706-21.413706-56.121182-21.413706-77.534887 0-21.413706 21.413706-21.413706 56.122205 0 77.534887l418.057421 418.057421L244.819868 930.057421c-21.413706 21.413706-21.413706 56.122205 0 77.534887 10.706853 10.706853 24.759917 16.059767 38.767955 16.059767s28.061103-5.353938 38.767955-16.059767L779.180132 550.767955C800.593837 529.35425 800.593837 494.64575 779.180132 473.232045z" />
          </svg>
        </span>
        <span className={styles.overlay()} aria-hidden="true" />
      </span>
    </button>
  );
}

export { Button };
export type { ButtonProps };
