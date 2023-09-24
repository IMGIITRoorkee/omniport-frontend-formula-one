import styles from "core/index.css";

/**
 * Wraps className with Tailwind
 *
 * @param {String} tailwindClass Tailwind classes separated by spaces
 * @returns {String} Wrapped Tailwind class
 */
export const tailwindWrapper = (tailwindClass) => {
  const tailwindClassList = tailwindClass.split(" ");

  const WrappedClassList = tailwindClassList.map((className) => styles[className]);

  return WrappedClassList.join(" ");
};
