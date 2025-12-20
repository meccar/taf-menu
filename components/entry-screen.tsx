"use client";

import { View, Pressable } from "react-native";
import { useI18n } from "@/lib/i18n/context";

export function EntryScreen({
  onSelect,
}: {
  onSelect: (mode: "menu" | "login") => void;
}) {
  const { t } = useI18n();

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Title */}
      <div className="text-center">
        <div className="text-2xl font-semibold mb-2">{t.ramenHouse}</div>
        <div className="text-sm text-muted-foreground">
          {t.welcome} {t.pleaseChoose}
        </div>
      </div>

      {/* Order button */}
      <Pressable
        onPress={() => onSelect("menu")}
        style={{
          height: 56,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "hsl(var(--border))",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-lg font-semibold">{t.orderFood}</span>
      </Pressable>

      {/* Login button */}
      <Pressable
        onPress={() => onSelect("login")}
        style={{
          height: 56,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "hsl(var(--border))",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-lg font-semibold">{t.staffLogin}</span>
      </Pressable>
    </View>
  );
}
