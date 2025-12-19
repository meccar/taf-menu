"use client";

import { useRef, useEffect, useState } from "react";
import { View } from "react-native";
import HTMLFlipBook from "react-pageflip";

export function MenuBook({
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
  const flipBookRef = useRef<any>(null);
  const [isInternalFlip, setIsInternalFlip] = useState(false);

  useEffect(() => {
    if (flipBookRef.current && !isInternalFlip) {
      try {
        const pageFlipInstance = flipBookRef.current.pageFlip();
        if (pageFlipInstance) {
          const currentPage = pageFlipInstance.getCurrentPageIndex();
          if (currentPage !== activeIndex) pageFlipInstance.flip(activeIndex);
        }
      } catch (error) {
        console.debug("PageFlip not ready:", error);
      }
    }
    setIsInternalFlip(false);
  }, [activeIndex, isInternalFlip]);

  const handleFlip = (e: any) => {
    const newPage = e.data;
    if (newPage !== activeIndex) {
      setIsInternalFlip(true);
      if (newPage > activeIndex) {
        onNextPage?.();
      } else {
        onPrevPage?.();
      }
    }
  };

  return (
    <View
      style={{
        position: "relative",
        height: "95%",
        width: "100%",
      }}
    >
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
        style={{
          height: "100%",
        }}
      >
        {pages.map((page, index) => (
          <div
            key={index}
            className="page bg-background rounded-xl"
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            {page}
          </div>
        ))}
      </HTMLFlipBook>
    </View>
  );
}
