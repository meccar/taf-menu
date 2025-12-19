import { View } from 'react-native'

export function MenuHeader() {
  return (
    <View
      style={{
        height: 56,
        borderBottomWidth: 1,
        borderColor: 'hsl(var(--border))',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >
      <div className="text-lg font-semibold">🍜 Ramen House</div>
      <div className="text-sm text-muted-foreground">Table 12</div>
    </View>
  )
}
