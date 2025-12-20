"use client";

import { useRef, useEffect, memo } from "react";
import HTMLFlipBook from "react-pageflip";

function MenuBookComponent({
  pages,
  activeIndex,
  onNextPage,
  onPrevPage,
}: {
  pages: React.ReactNode[];
  activeIndex: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}) {
  const flipBookRef = useRef<{
    pageFlip: () => {
      getCurrentPageIndex: () => number;
      flip: (page: number) => void;
      flipToPage?: (page: number) => void;
      flipNext?: () => void;
      flipPrev?: () => void;
    };
  } | null>(null);
  const prevIndexRef = useRef(activeIndex);
  const isProgrammaticFlipRef = useRef(false);

  useEffect(() => {
    if (!flipBookRef.current) return;

    try {
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (!pageFlipInstance) return;
      const currentPage = pageFlipInstance.getCurrentPageIndex();

      if (currentPage !== activeIndex) {
        isProgrammaticFlipRef.current = true;
        prevIndexRef.current = currentPage;

        const flipDistance = activeIndex - currentPage;

        // Use flipToPage if available (handles both directions with animation)
        if (pageFlipInstance.flipToPage) {
          pageFlipInstance.flipToPage(activeIndex);
          const totalAnimationTime = Math.max(
            Math.abs(flipDistance) * 700,
            700
          );
          setTimeout(() => {
            isProgrammaticFlipRef.current = false;
            prevIndexRef.current = activeIndex;
          }, totalAnimationTime + 200);
        }
        // Use flipNext/flipPrev if available (better animation control)
        else if (pageFlipInstance.flipNext && pageFlipInstance.flipPrev) {
          if (flipDistance > 0) {
            // Flip forward
            for (let i = 0; i < flipDistance; i++) {
              setTimeout(() => {
                pageFlipInstance.flipNext?.();
              }, i * 700);
            }
          } else {
            // Flip backward
            for (let i = 0; i < Math.abs(flipDistance); i++) {
              setTimeout(() => {
                pageFlipInstance.flipPrev?.();
              }, i * 700);
            }
          }
          const totalAnimationTime = Math.abs(flipDistance) * 700;
          setTimeout(() => {
            isProgrammaticFlipRef.current = false;
            prevIndexRef.current = activeIndex;
          }, totalAnimationTime + 200);
        }
        // Fallback to flip method
        else {
          if (flipDistance > 0) {
            // Flip forward - flip to each page sequentially
            for (let i = 0; i < flipDistance; i++) {
              setTimeout(() => {
                const targetPage = currentPage + i + 1;
                pageFlipInstance.flip(targetPage);
              }, i * 700);
            }
          } else {
            // Flip backward - flip to each page sequentially
            for (let i = 0; i < Math.abs(flipDistance); i++) {
              setTimeout(() => {
                const targetPage = currentPage - i - 1;
                pageFlipInstance.flip(targetPage);
              }, i * 700);
            }
          }
          const totalAnimationTime = Math.abs(flipDistance) * 700;
          setTimeout(() => {
            isProgrammaticFlipRef.current = false;
            prevIndexRef.current = activeIndex;
          }, totalAnimationTime + 200);
        }
      }
    } catch (error) {
      console.debug("PageFlip not ready:", error);
    }
  }, [activeIndex]);

  const handleFlip = (e: { data: number }) => {
    const newPage = e.data;

    if (isProgrammaticFlipRef.current) {
      prevIndexRef.current = newPage;
      return;
    }

    if (newPage > prevIndexRef.current) onNextPage?.();
    else if (newPage < prevIndexRef.current) onPrevPage?.();
    prevIndexRef.current = newPage;
  };

  return (
    <HTMLFlipBook
      ref={flipBookRef}
      width={400}
      height={600}
      size="stretch"
      minWidth={300}
      maxWidth={500}
      minHeight={400}
      maxHeight={700}
      maxShadowOpacity={0.5}
      showCover={false}
      mobileScrollSupport={true}
      onFlip={handleFlip}
      startPage={activeIndex}
      drawShadow={true}
      flippingTime={700}
      usePortrait={true}
      startZIndex={0}
      autoSize={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={30}
      showPageCorners={false}
      disableFlipByClick={false}
      className="w-full h-full"
      style={{}}
    >
      {pages.map((page, index) => (
        <div key={index} className="w-full bg-background rounded-xl">
          {page}
        </div>
      ))}
    </HTMLFlipBook>
  );
}

export const MenuBook = memo(MenuBookComponent);
