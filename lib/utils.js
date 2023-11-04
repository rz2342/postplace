import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isDarkMode() {
    return document.documentElement.classList.contains('dark');
}

export function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('dark', isDarkMode());
}