import { StyleSheet } from "react-native";

import { Text, TextProps } from "../../components/Themed";

export default function Title({ children, ...props }: TextProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Circular-Bold",
    fontSize: 34,
    lineHeight: 42,
  },
});
