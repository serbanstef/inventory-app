import { useState, useEffect } from "react";
import { StyleSheet, Platform } from "react-native";

import { Text, View } from "../components/Themed";
import { AddPhoto, AddItemForm } from "../components/Inventory";
import Button from "../components/Button";
import { InventoryItem, RootTabScreenProps } from "../types";
import { useInventory } from "../contexts/inventory";

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"Inventory">) {
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { maxValue, addNewItem } = useInventory();

  useEffect(() => {
    if (item && photo) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [item, photo]);

  const handleCancelPress = () => navigation.goBack();

  const handleAddPress = () => {
    if (item && photo) {
      addNewItem({ ...item, photo: photo });
      navigation.goBack();
    }
  };

  const handlePhotoSelection = (uri: string | null) => setPhoto(uri);

  const handleFormResult = (formResult: InventoryItem | null) =>
    setItem(formResult);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={handleCancelPress} />
        <Button title="Add" disabled={!isFormValid} onPress={handleAddPress} />
      </View>
      <AddPhoto onPhotoSelection={handlePhotoSelection} />
      <AddItemForm
        onFormResult={handleFormResult}
        maxValue={maxValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#E5E5E5",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  buttonsContainer: {
    width: "100%",
    // height: 42,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
