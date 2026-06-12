import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const react = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Calculate the initial position
    let left = react.left + window.scrollX;
    const top = react.bottom + window.scrollY;

    // Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // Align to righh edge of button instead
      left = react.right + window.scrollX - dropdownWidth;

      // If still off-screen, algin to the right edge of viewport with some padding
      if (left < 0) left = window.innerWidth - dropdownWidth - 16;
    }

    // Ensure dropdown doesn't go off left edge
    if (left < 0) left = 15;

    return { top, left };
  };

  return { getDropdownPosition };
};
