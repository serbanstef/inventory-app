import { useState } from "react";
import { TextInput, TextInputProps, StyleSheet, ViewStyle } from "react-native";

import { View, Text } from "./Themed";
import { CircularText } from "./StyledText";

export interface FormInputProps extends TextInputProps {
  label: string;
  endElement?: string;
  containerStyle?: ViewStyle;
}

export default function FormInput({
  label,
  endElement,
  containerStyle,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <CircularText style={styles.label}>{label}</CircularText>
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            borderColor: isFocused ? "#2D50E6" : "#dddbd7",
            height: props?.multiline ? 128 : 48,
          },
          props.style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#C0BEB8"}
      />
      {endElement && <Text style={styles.endElement}>{endElement}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    marginTop: 20,
  },
  label: {
    fontSize: 13,
    lineHeight: 17,
    color: "#2C2302",
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 2,
    borderColor: "#dddbd7",
    borderRadius: 10,
    backgroundColor: "white",
    fontFamily: "Circular-Regular",
    paddingLeft: 15,
    marginTop: 5,
    color: "#2C2302",
  },
  endElement: {
    position: "absolute",
    right: 10,
    bottom: 13,
    fontFamily: "Circular-Regular",
    fontSize: 17,
    color: "#6B6651",
  },
});
