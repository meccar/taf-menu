"use client";

import { memo } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { View } from "react-native";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useSessionContext } from "@/lib/context/session-context";

function MenuCardComponent({
  name,
  description,
  price,
  image,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
}) {
  const dispatch = useDispatch();
  const { isValid } = useSessionContext();

  const handleAddToCart = () => {
    if (!isValid) {
      alert("Please scan the QR code at your table to add items to your cart.");
      return;
    }

    dispatch(
      addItem({
        id: name,
        name,
        price,
      })
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-3 group h-full justify-between flex flex-col">
      {/* Image */}
      <Image
        src={image}
        alt={name}
        width={500}
        height={150}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Content */}
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          backgroundColor: "white",
        }}
      >
        {/* Text content */}
        <View style={{ flex: 1, paddingRight: 12 }}>
          <h3 className="font-medium line-clamp-2">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
          <p className="mt-1 font-semibold">${price}</p>
        </View>

        {/* Action */}
        <Button
          size="icon"
          className="h-10 w-10 rounded-full flex-shrink-0"
          onClick={handleAddToCart}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </View>
    </div>
  );
}

export const MenuCard = memo(MenuCardComponent);
