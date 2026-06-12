"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import { CustommCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustommCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}
export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (category.subcategories?.length) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const dropdownPosition = getDropdownPosition();

  return (
    <div
      className='relative'
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div className='relative'>
        <Button
          variant='elevated'
          aria-expanded={isOpen}
          aria-haspopup='true'
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full text-black hover:bg-white hover:border-primary",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-1",
          )}
        >
          <Link href={`${category.slug === "all" ? "/" : category.slug}`} prefetch>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories?.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 size-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100",
            )}
          ></div>
        )}
      </div>

      <SubcategoryMenu category={category} isOpen={isOpen} position={dropdownPosition} />
    </div>
  );
};
