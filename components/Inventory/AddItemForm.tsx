import { useEffect, useState } from "react";
import { TextInput, StyleSheet, ScrollView } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormInput from "../FormInput";

import { InventoryItem } from "../../types";

export interface AddItemFormProps {
  maxValue: number;
  onFormResult: (item: InventoryItem | null) => void;
}

export default function AddItemForm({
  maxValue,
  onFormResult,
}: AddItemFormProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (name.length > 0 && value && value < maxValue) {
      onFormResult({ name, value, description });
    } else {
      onFormResult(null);
    }
  }, [name, value]);

  const handleNameChange = (text: string) => setName(text);

  const handleValueChange = (text: string) => {
    const newValue = parseInt(text);
    setValue(newValue);
    if (newValue > maxValue) alert("You are over the maximum value!");
  };

  const handleDescriptionChange = (text: string) => setDescription(text);

  return (
    <KeyboardAwareScrollView style={styles.container} extraHeight={260}>
      <FormInput
        label="Name"
        placeholder="Bracelet"
        onChangeText={handleNameChange}
      />
      <FormInput
        label="Value"
        placeholder="700"
        endElement="€"
        keyboardType="number-pad"
        onChangeText={handleValueChange}
      />
      <FormInput
        label="Category"
        placeholder="Select a category..."
        endElement="▾"
        editable={false}
      />
      <FormInput
        label="Description"
        placeholder="Optional"
        multiline
        textAlignVertical="top"
        style={{ paddingTop: 10 }}
        onChangeText={handleDescriptionChange}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownItem: {
    fontFamily: "Circular-Regular",
    fontSize: 17,
    color: "#2C2302",
    backgroundColor: "white",
  },
});
