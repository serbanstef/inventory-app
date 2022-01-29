import { Pressable, PressableProps } from "react-native";

import { CircularText } from "./StyledText";

export default function Button({
  title,
  ...props
}: PressableProps & { title: string }) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        { ...(typeof props.style === "object" && props.style) },
      ]}
      pressRetentionOffset={20}
      hitSlop={20}
    >
      <CircularText
        style={{ fontSize: 17, color: props.disabled ? "#C0BEB8" : "#2D50E6" }}
      >
        {title}
      </CircularText>
    </Pressable>
  );
}
