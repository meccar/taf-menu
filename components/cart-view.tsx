"use client";

import { View, Pressable, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addItem, removeItem, updateQuantity } from "@/store/cartSlice";
import { Button } from "./ui/button";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/store/cartSlice";
import { useI18n } from "@/lib/i18n/context";

export function CartView() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { t } = useI18n();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(addItem({ id: item.id, name: item.name, price: item.price }));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.qty > 1) {
      dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const handleOrder = () => {
    // TODO: Implement order functionality
    alert(t.orderPlacedSuccessfully);
  };

  if (cartItems.length === 0) {
    return (
      <View
        style={{
          padding: 24,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 200,
        }}
      >
        <div className="text-lg font-semibold text-muted-foreground">
          {t.yourCartIsEmpty}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {t.addItemsFromMenu}
        </div>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "hsl(var(--border))",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Item Info */}
            <View style={{ flex: 1 }}>
              <div className="font-medium text-base">{item.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                ${item.price.toFixed(2)} {t.each}
              </div>
              <div className="text-sm font-semibold mt-1">
                ${(item.price * item.qty).toFixed(2)} {t.total}
              </div>
            </View>

            {/* Quantity Controls */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderWidth: 1,
                borderColor: "hsl(var(--border))",
                borderRadius: 8,
                padding: 4,
              }}
            >
              <Pressable
                onPress={() => handleDecreaseQuantity(item)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                <Minus size={16} color="hsl(var(--foreground))" />
              </Pressable>

              <div
                style={{
                  minWidth: 32,
                  textAlign: "center",
                  fontWeight: "600",
                }}
                className="text-base"
              >
                {item.qty}
              </div>

              <Pressable
                onPress={() => handleIncreaseQuantity(item)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                <Plus size={16} color="hsl(var(--foreground))" />
              </Pressable>
            </View>

            {/* Remove Button */}
            <Pressable
              onPress={() => handleRemoveItem(item.id)}
              style={{
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: "hsl(var(--destructive) / 0.1)",
              }}
            >
              <Trash2 size={18} color="hsl(var(--destructive))" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Summary and Order Button */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "hsl(var(--border))",
          padding: 16,
          gap: 12,
          backgroundColor: "hsl(var(--background))",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-sm text-muted-foreground">
            {t.totalQuantity}:
          </div>
          <div className="text-base font-semibold">
            {totalQuantity} {t.items}
          </div>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-lg font-semibold">{t.totalPrice}:</div>
          <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
        </View>

        <Button
          onClick={handleOrder}
          className="w-full mt-2"
          size="lg"
          disabled={cartItems.length === 0}
        >
          {t.placeOrder}
        </Button>
      </View>
    </View>
  );
}
