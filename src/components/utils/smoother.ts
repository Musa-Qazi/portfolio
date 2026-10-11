import type { ScrollSmoother } from "gsap-trial/ScrollSmoother";

export let smoother: ScrollSmoother | undefined;

export const setSmoother = (instance: ScrollSmoother | undefined) => {
  smoother = instance;
};
