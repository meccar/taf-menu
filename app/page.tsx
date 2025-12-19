'use client'

import { useState } from 'react'
import { EntryScreen } from '@/components/entry-screen'
import { MenuScreen } from '@/components/menu-screen'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [mode, setMode] = useState<'menu' | 'login' | null>(null)
  const router = useRouter()

  if (!mode)
    return (
      <EntryScreen
        onSelect={(value) => {
          if (value === 'login')
            router.push('/login')
          else
            setMode('menu')
        }}
      />
    )

  return <MenuScreen />
}
