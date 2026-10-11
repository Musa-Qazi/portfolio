import type { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother | undefined;

export const setSmoother = (instance: ScrollSmoother | undefined) => {
  smoother = instance;
};
