import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { colors } from "../utils";
import { AntDesign } from "@expo/vector-icons";

export default function SearchItem({city, country, state}) {

  return (
    <View style={styles.searchItem}>
      <View style={styles.searchItemContent}>
        <View>
          <Text style={styles.title}>{city}</Text>
          <Text style={styles.text}>{state}, {country}</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#ccc"
          style={styles.iconWrapper}
          onPress={() => {
            console.log("click");
          }}
        >
          <AntDesign
            name="arrowright"
            size={24}
            color={colors.PRIMARY_COLOR}
          />
        </TouchableHighlight>
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
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "700",
    color: "#333",
  },
  text: {
    color: "#333",
  },
  searchItemContent: {
    borderLeftWidth: 4,
    borderColor: colors.PRIMARY_COLOR,
    paddingLeft: 10,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});
