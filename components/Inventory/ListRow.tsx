import { StyleSheet } from "react-native";

import ListItem from "./ListItem";
import { View } from "../Themed";
import { InventoryItem } from "../../types";

export interface RowProps {
  item1: InventoryItem;
  item2?: InventoryItem;
}

export default function ListRow({ item1, item2 }: RowProps) {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.itemContainer}>
        <ListItem {...item1} />
      </View>
      <View style={styles.spacer} />
      {item2 ? (
        <View style={styles.itemContainer}>
          <ListItem {...item2} />
        </View>
      ) : (
        <View style={styles.placeHolder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    height: 265,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  spacer: {
    height: "100%",
    width: 20,
    backgroundColor: "transparent",
  },
  itemContainer: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  placeHolder: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
