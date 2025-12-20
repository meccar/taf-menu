import { memo } from "react";

function MenuPageComponent({
  children,
  pageNumber,
}: {
  children: React.ReactNode;
  pageNumber?: number;
}) {
  return (
    <div
      className="h-full w-full p-4 flex flex-col"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div className="flex-1 overflow-hidden">{children}</div>

      {pageNumber && (
        <div className="mt-4 pt-2 border-t border-gray-200 text-right text-sm text-gray-500">
          {pageNumber}
        </div>
      )}
    </div>
  );
}

export const MenuPage = memo(MenuPageComponent);
