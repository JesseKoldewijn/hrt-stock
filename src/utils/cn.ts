import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The `cn` function is a TypeScript function that merges multiple class values into a single string.
 * @param {ClassValue[]} inputs - The `inputs` parameter is an array of `ClassValue` types.
 * `ClassValue` is a type that represents a CSS class name or an object with class names as keys and
 * boolean values as values. It is used to conditionally apply CSS classes based on certain conditions.
 * @returns The `cn` function is returning the result of calling `twMerge` with the result of calling
 * `clsx` with the `inputs` array as arguments.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
