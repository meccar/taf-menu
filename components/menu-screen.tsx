'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { View } from 'react-native'
import { CategoryTab } from '@/components/category-tab'
import { MenuCard } from '@/components/menu-card'
import { CartButton } from '@/components/cart-button'
import { MenuHeader } from './menu-header'
import { MenuBook } from './menu-book'
import { MenuPage } from './menu-page'
import { useState } from 'react'

const categories = ['ramen', 'rice', 'drinks'] as const

export function MenuScreen() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNextPage = () => {
    if (activeIndex < categories.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const handlePrevPage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'hsl(var(--background))'
      }}>
      {/* Header */}
      <MenuHeader />

      <Tabs.Root
        value={categories[activeIndex]}
        onValueChange={(value) =>
          setActiveIndex(categories.indexOf(value as any))
        }
      >
        <Tabs.List className="flex gap-2 px-4 py-3 overflow-x-auto">
          <CategoryTab value="ramen" label="Ramen" />
          <CategoryTab value="rice" label="Rice" />
          <CategoryTab value="drinks" label="Drinks" />
        </Tabs.List>
      </Tabs.Root>

      <div className="relative mx-auto w-full max-w-[420px] h-[75vh]">
        <div className="absolute h-[95%] inset-0 rounded-2xl bg-[#fdfbf7] shadow-[0_20px_50px_rgba(0,0,0,0.2)]" />
        <MenuBook
          activeIndex={activeIndex}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          pages={[
            <MenuPage key="ramen">
              <MenuCard name="Spicy Pork Ramen" description="Rich broth" price={12} />
              <MenuCard name="Miso Ramen" description="Miso broth" price={11} />
            </MenuPage>,

            <MenuPage key="rice">
              <MenuCard name="Chicken Teriyaki" description="Grilled chicken" price={9} />
            </MenuPage>,

            <MenuPage key="drinks">
              <MenuCard name="Iced Tea" description="Cold & refreshing" price={3} />
            </MenuPage>,
          ]}
        />
      </div>
      <CartButton />

    </View>
  )
}
