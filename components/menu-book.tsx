'use client'

import clsx from 'clsx'

export function MenuBook({
  pages,
  activeIndex,
}: {
  pages: React.ReactNode[]
  activeIndex: number
}) {
  return (
    <div className="relative h-full perspective-[1600px]">
      {pages.map((page, index) => {
        const isActive = index === activeIndex
        const isBefore = index < activeIndex

        return (
          <div
            key={index}
            className={clsx(
              'absolute inset-0 bg-background rounded-xl shadow-lg transition-transform duration-700 ease-in-out origin-left',
              isActive && 'z-20',
              isBefore && 'rotate-y-[-180deg] z-10',
              !isActive && !isBefore && 'rotate-y-0 z-0'
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {page}
          </div>
        )
      })}
    </div>
  )
}
