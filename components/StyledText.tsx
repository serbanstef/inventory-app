import { Text, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function CircularText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "Circular-Regular" }]}
    />
  );
}

export function CircularTextBold(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Circular-Bold" }]} />
  );
}
