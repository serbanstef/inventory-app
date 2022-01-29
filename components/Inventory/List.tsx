import { StyleSheet, FlatList, ListRenderItem } from "react-native";

import ListRow from "./ListRow";
import { convertToRows } from "../../utils/inventory";
import { InventoryItem, Items } from "../../types";

export interface ListProps {
  items: Items;
}

const renderItem: ListRenderItem<InventoryItem[]> = ({ item }) => {
  return <ListRow item1={item[0]} item2={item[1]} />;
};

const keyExtractor = (item: InventoryItem[]) => `${item[0].id}${item[1]?.id}`;

export default function List({ items }: ListProps) {
  const rows = convertToRows<InventoryItem>(items, 2);

  return (
    <FlatList
      data={rows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "transparent",
  },
});
