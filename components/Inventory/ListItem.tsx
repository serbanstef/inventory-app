import { StyleSheet, Image } from "react-native";

import { CircularText, CircularTextBold } from "../StyledText";
import { View } from "../Themed";
import { numberWithCommas } from "../../utils/inventory";
import { InventoryItem } from "../../types";

export default function ListItem({ name, value, photo }: InventoryItem) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }}
        style={{ width: "100%", height: 158 }}
      />

      <CircularTextBold
        style={styles.title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {name}
      </CircularTextBold>
      <CircularText style={styles.value}>{`€${numberWithCommas(
        value
      )}`}</CircularText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 265,
  },
  title: {
    color: "#2C2302",
    fontSize: 19,
    lineHeight: 26,
    marginLeft: 20,
    marginTop: 15,
    width: "80%",
  },
  value: {
    position: "absolute",
    bottom: 15,
    left: 20,
    color: "#6B6651",
  },
});
