"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { CategoryTab } from "./category-tab";

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

  return (
    <Tabs.Root
      value={categories[activeIndex]}
      onValueChange={(value) => onIndexChange(categories.indexOf(value))}
    >
      <Tabs.List className="flex gap-2 px-4 py-3 overflow-x-auto">
        {categories.map((category) => (
          <CategoryTab
            key={category}
            value={category}
            label={getLabel(category)}
          />
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
