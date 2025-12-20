"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CartView } from "./cart-view";
import { useI18n } from "@/lib/i18n/context";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const { t } = useI18n();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            height: 50,
            width: 160,
            borderRadius: 30,
            backgroundColor: "#f97316",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
            zIndex: 20,
          }}
        >
          <ShoppingCart size={20} color="white" />
          <span className="font-semibold text-primary-foreground">
            {t.viewCart} ({totalQuantity})
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-background p-0 max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Dialog.Title className="text-lg font-semibold">
              {t.yourOrder}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            {t.yourOrder}
          </Dialog.Description>
          <CartView />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
