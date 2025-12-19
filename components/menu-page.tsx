import { View } from "react-native";

export function MenuPage({
  children,
  pageNumber,
}: {
  children: React.ReactNode;
  pageNumber?: number;
}) {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        position: "relative",
      }}
    >
      <div
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>

        {pageNumber && (
          <div
            style={{
              textAlign: "right",
              marginTop: 16,
              paddingTop: 8,
              borderTop: "1px solid #e5e7eb",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            {pageNumber}
          </div>
        )}
      </div>
    </View>
  );
}
