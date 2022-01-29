import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Title from "../components/Inventory/Title";
import AddButton from "../components/AddButton";
import List from "../components/Inventory/List";
import { useInventory } from "../contexts/inventory";
import { RootTabScreenProps } from "../types";

export default function InventoryScreen({
  navigation,
}: RootTabScreenProps<"Inventory">) {
  const { inventory } = useInventory();

  const handleAddButtonPress = () => navigation.navigate("AddItem");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title>Inventory</Title>
        <AddButton onPress={handleAddButtonPress} />
      </View>
      <List items={inventory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#E5E5E5",
  },
  titleContainer: {
    width: "100%",
    height: 42,
    marginTop: 99,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
