/**
 * Shared gate for the cursor-reactive effects.
 *
 * Every effect in the site asks the same two questions before attaching any
 * listener: is there a real pointer to follow, and does the visitor want
 * motion? Centralising it keeps the answers consistent and means touch devices
 * and reduced-motion users never pay for listeners they cannot trigger.
 */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** True when the device has a real cursor and the visitor allows motion. */
export function supportsPointerEffects() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return (
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(REDUCED_MOTION).matches
  );
}

/**
 * Runs `setup` only while pointer effects are supported, re-running it if the
 * visitor switches input device or toggles reduced motion mid-session.
 *
 * `setup` returns its own teardown, which runs before each re-evaluation and on
 * unmount — so listeners are always released.
 */
export function withPointerEffects(setup: () => (() => void) | void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};

  const queries = [
    window.matchMedia(FINE_POINTER),
    window.matchMedia(REDUCED_MOTION),
  ];

  let teardown: (() => void) | void;

  const evaluate = () => {
    teardown?.();
    teardown = undefined;
    if (supportsPointerEffects()) teardown = setup();
  };

  evaluate();
  queries.forEach((q) => q.addEventListener("change", evaluate));

  return () => {
    teardown?.();
    queries.forEach((q) => q.removeEventListener("change", evaluate));
  };
}

/** Frame-rate-independent approach to a target; higher `ease` closes faster. */
export function damp(current: number, target: number, ease: number) {
  return current + (target - current) * ease;
}
