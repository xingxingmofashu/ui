import { tv } from "tailwind-variants";

export default tv({
  slots: {
    root: [
      "m-0 flex w-full min-w-0 flex-col gap-4",
      "border-0 p-0 text-ui-ink",
    ],
    legend: [
      "w-fit font-medium text-base text-ui-ink",
      "[filter:var(--ui-drop-shadow-label)]",
      "data-[disabled]:opacity-60",
    ],
  },
});
