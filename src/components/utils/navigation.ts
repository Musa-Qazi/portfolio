import type { MouseEvent } from "react";

export const navigate = (path: string) => {
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` === path) {
    return;
  }

  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" });
};

export const handleInternalLink = (event: MouseEvent<HTMLAnchorElement>) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  ) {
    return;
  }

  const destination = new URL(event.currentTarget.href);
  if (destination.origin !== window.location.origin) return;

  event.preventDefault();
  navigate(`${destination.pathname}${destination.search}${destination.hash}`);
};
