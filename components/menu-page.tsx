import { View } from 'react-native'

export function MenuPage({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backfaceVisibility: 'hidden',
        height: '95%',
        width: '100%',
      }}
    >
      <div
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </div>
    </View>
  )
}
