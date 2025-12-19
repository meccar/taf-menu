"use client";

import { View } from "react-native";
import { CartButton } from "@/components/cart-button";
import { MenuHeader } from "./menu-header";
import { MenuContent } from "./menu-content";
import { useState, useMemo } from "react";
import { CategoryTabList } from "./category-tab-list";
import { menuCategories } from "@/lib/menu-data";
import { Card } from "./ui/card";

const categories = menuCategories.map((c) => c.key);

export function MenuScreen() {
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Calculate which category the current page belongs to
  const activeCategoryIndex = useMemo(() => {
    let pageCount = 0;
    for (let i = 0; i < menuCategories.length; i++) {
      const categoryPageCount = menuCategories[i].pages.length;
      if (activePageIndex < pageCount + categoryPageCount) {
        return i;
      }
      pageCount += categoryPageCount;
    }
    return 0;
  }, [activePageIndex]);

  // Get total number of pages
  const totalPages = useMemo(
    () => menuCategories.reduce((sum, cat) => sum + cat.pages.length, 0),
    []
  );

  const handleNextPage = () => {
    if (activePageIndex < totalPages - 1) {
      setActivePageIndex(activePageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageIndex(activePageIndex - 1);
    }
  };

  const handleCategoryChange = (categoryIndex: number) => {
    // Jump to the first page of the selected category
    let pageIndex = 0;
    for (let i = 0; i < categoryIndex; i++) {
      pageIndex += menuCategories[i].pages.length;
    }
    setActivePageIndex(pageIndex);
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      {/* Header */}
      <MenuHeader />

      <CategoryTabList
        categories={categories}
        activeIndex={activeCategoryIndex}
        onIndexChange={handleCategoryChange}
      />

      <div className="relative mx-auto w-full max-w-[420px] h-[75vh]">
        <Card className="absolute h-[95%] inset-0 rounded-2xl bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <MenuContent
            activeIndex={activePageIndex}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            categories={menuCategories}
          />
        </Card>
      </div>
      <CartButton />
    </View>
  );
}
