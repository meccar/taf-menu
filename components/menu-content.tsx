"use client";

import { memo, useMemo } from "react";
import { MenuBook } from "./menu-book";
import { MenuPage } from "./menu-page";
import { MenuCard } from "./menu-card";
import { MenuCategory } from "@/lib/menu-data";

interface MenuContentProps {
  activeIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  categories: MenuCategory[];
}

function MenuContentComponent({
  activeIndex,
  onNextPage,
  onPrevPage,
  categories,
}: MenuContentProps) {
  const pages = useMemo(
    () =>
      categories.flatMap((category) =>
        category.pages.map((page) => (
          <MenuPage
            key={`${category.key}-page-${page.pageNumber}`}
            pageNumber={page.pageNumber}
          >
            {page.items.map((item) => (
              <MenuCard
                key={item.name}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </MenuPage>
        ))
      ),
    [categories]
  );

  return (
    <MenuBook
      activeIndex={activeIndex}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      pages={pages}
    />
  );
}

export const MenuContent = memo(MenuContentComponent);
