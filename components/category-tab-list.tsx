"use client";

import { useMemo } from "react";

interface CategoryTabsProps {
  categories: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  categoryLabels?: Record<string, string>;
}

export function CategoryTabList({
  categories,
  activeIndex,
  onIndexChange,
  categoryLabels,
}: CategoryTabsProps) {
  const getLabel = (category: string) => {
    return (
      categoryLabels?.[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  // Ensure activeIndex is within bounds
  const safeActiveIndex = useMemo(() => {
    if (activeIndex < 0 || activeIndex >= categories.length) return 0;
    return activeIndex;
  }, [activeIndex, categories.length]);

  if (categories.length === 0) return null;

  const handleClick = (index: number) => {
    if (index >= 0 && index < categories.length) onIndexChange(index);
  };

  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
      {categories.map((category, index) => {
        const isActive = index === safeActiveIndex;
        return (
          <button
            key={category}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(index);
            }}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-transparent hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {getLabel(category)}
          </button>
        );
      })}
    </div>
  );
}
