'use client'

import * as Tabs from '@radix-ui/react-tabs'

export function CategoryTab({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <Tabs.Trigger
      value={value}
      className="px-4 py-1 rounded-full border text-sm font-medium
                 data-[state=active]:bg-primary
                 data-[state=active]:text-primary-foreground"
    >
      {label}
    </Tabs.Trigger>
  )
}
