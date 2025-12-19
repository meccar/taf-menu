'use client'

import { View, Pressable } from 'react-native'

export function EntryScreen({
  onSelect,
}: {
  onSelect: (mode: 'menu' | 'login') => void
}) {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Title */}
      <div className="text-center">
        <div className="text-2xl font-semibold mb-2">
          🍜 Ramen House
        </div>
        <div className="text-sm text-muted-foreground">
          Welcome! Please choose
        </div>
      </div>

      {/* Order button */}
      <Pressable
        onPress={() => onSelect('menu')}
        style={{
          height: 56,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'hsl(var(--border))',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="text-lg font-semibold">
          Order Food
        </span>
      </Pressable>

      {/* Login button */}
      <Pressable
        onPress={() => onSelect('login')}
        style={{
          height: 56,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'hsl(var(--border))',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="text-lg font-semibold">
          Staff Login
        </span>
      </Pressable>
    </View>
  )
}
