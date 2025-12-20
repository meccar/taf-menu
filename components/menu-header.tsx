"use client";

import { View } from "react-native";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

export function MenuHeader() {
  const { t } = useI18n();

  return (
    <View
      style={{
        height: 56,
        borderBottomWidth: 1,
        borderColor: "hsl(var(--border))",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <div className="text-lg font-semibold">{t.ramenHouse}</div>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <div className="text-sm text-muted-foreground">{t.table} 12</div>
        <LanguageSwitcher />
      </View>
    </View>
  );
}
