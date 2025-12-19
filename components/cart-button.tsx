'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingCart } from 'lucide-react'
import { Pressable } from 'react-native'

export function CartButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Pressable
          style={{
            position: 'absolute',
            bottom: 10,
            right: 0,
            height: 50,
            width: 160,
            borderRadius: 30,
            backgroundColor: '#f97316',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
            zIndex: 20,
          }}
        >
          <ShoppingCart size={20} color="white" />
          <span className="font-semibold text-primary-foreground">
            View Cart (2)
          </span>
        </Pressable>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-background p-4">
          <div className="text-lg font-semibold mb-2">Your Order</div>
          <div className="text-sm text-muted-foreground">
            Cart UI goes here
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
