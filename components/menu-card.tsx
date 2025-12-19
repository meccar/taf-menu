"use client";

import { Plus } from "lucide-react";
import { View, Pressable, Image } from "react-native";

export function MenuCard({
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
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      {/* Image */}
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 150,
        }}
      />

      {/* Content */}
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* Text content */}
        <div className="flex-1 pr-3">
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
          <div className="mt-1 font-semibold">${price}</div>
        </div>

        {/* Action */}
        <Pressable
          style={{
            height: 40,
            width: 40,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsl(var(--primary))",
          }}
        >
          <Plus className="w-4 h-4 text-primary-foreground" />
        </Pressable>
      </View>
    </View>
  );
}
