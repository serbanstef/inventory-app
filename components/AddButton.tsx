import { StyleSheet, Pressable, PressableProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddButton(props: PressableProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.button,
        { ...(typeof props.style === "object" && props.style) },
      ]}
      pressRetentionOffset={10}
    >
      <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2D50E6",
    alignItems: "center",
    justifyContent: "center",
  },
});
