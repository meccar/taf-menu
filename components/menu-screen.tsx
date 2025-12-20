"use client";

import { useCallback, useReducer } from "react";
import { CartButton } from "@/components/cart-button";
import { MenuHeader } from "./menu-header";
import { MenuContent } from "./menu-content";
import { CategoryTabList } from "./category-tab-list";
import {
  menuCategories,
  getPageIndexForCategory,
  getActiveCategoryIndex,
} from "@/lib/menu-data";
import { Card } from "./ui/card";

const categories = menuCategories.map((c) => c.key);
const totalPages = menuCategories.reduce(
  (sum, cat) => sum + cat.pages.length,
  0
);

type MenuState = {
  pageIndex: number;
  categoryIndex: number;
};

type MenuAction =
  | { type: "SET_CATEGORY"; categoryIndex: number }
  | { type: "SET_PAGE"; pageIndex: number }
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" };

function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "SET_CATEGORY": {
      const newPageIndex = getPageIndexForCategory(
        action.categoryIndex,
        menuCategories
      );
      return {
        categoryIndex: action.categoryIndex,
        pageIndex: newPageIndex,
      };
    }
    case "SET_PAGE": {
      const newCategoryIndex = getActiveCategoryIndex(
        action.pageIndex,
        menuCategories
      );
      return {
        pageIndex: action.pageIndex,
        categoryIndex: newCategoryIndex,
      };
    }
    case "NEXT_PAGE": {
      const newPageIndex = Math.min(state.pageIndex + 1, totalPages - 1);
      const newCategoryIndex = getActiveCategoryIndex(
        newPageIndex,
        menuCategories
      );
      return {
        pageIndex: newPageIndex,
        categoryIndex: newCategoryIndex,
      };
    }
    case "PREV_PAGE": {
      const newPageIndex = Math.max(state.pageIndex - 1, 0);
      const newCategoryIndex = getActiveCategoryIndex(
        newPageIndex,
        menuCategories
      );
      return {
        pageIndex: newPageIndex,
        categoryIndex: newCategoryIndex,
      };
    }
    default:
      return state;
  }
}

export function MenuScreen() {
  const [state, dispatch] = useReducer(menuReducer, {
    pageIndex: 0,
    categoryIndex: 0,
  });

  const handleNextPage = useCallback(() => {
    dispatch({ type: "NEXT_PAGE" });
  }, []);

  const handlePrevPage = useCallback(() => {
    dispatch({ type: "PREV_PAGE" });
  }, []);

  const handleCategoryChange = useCallback((categoryIndex: number) => {
    if (categoryIndex < 0 || categoryIndex >= menuCategories.length) return;

    dispatch({ type: "SET_CATEGORY", categoryIndex });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <MenuHeader />

      <CategoryTabList
        categories={categories}
        activeIndex={state.categoryIndex}
        onIndexChange={handleCategoryChange}
      />

      <div className="relative mx-auto w-full max-w-[420px] h-[75vh]">
        <Card className="absolute h-[95%] inset-0 rounded-2xl bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <MenuContent
            activeIndex={state.pageIndex}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            categories={menuCategories}
          />
        </Card>
      </div>
      <CartButton />
    </div>
  );
}
