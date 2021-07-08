import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils";
import { AntDesign } from "@expo/vector-icons";

export default function SearchItem() {
  return (
    <View style={styles.searchItem}>
      <View style={styles.searchItemContent}>
        <View>
          <Text style={styles.title}>aaa</Text>
          <Text>aaa</Text>
        </View>
        <AntDesign
          name="arrowright"
          size={24}
          color={colors.PRIMARY_COLOR}
          style={{ marginBottom: -5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchItem: {
    backgroundColor: colors.BORDER_COLOR,
    borderRadius: 10,
    height: 80,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  title:{
    fontWeight: '700'
  },
  searchItemContent: {
    borderLeftWidth: 4,
    borderColor: colors.PRIMARY_COLOR,
    paddingLeft: 10,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
});
