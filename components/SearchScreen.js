import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { colors } from "../utils";
import PreviousSearches from './PreviousSearches'

export default function SearchScreen() {
  return (
    <View style={styles.searchSreen}>
      <Text>Type your location here:</Text>
      <TextInput style={styles.input} />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      <PreviousSearches />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSreen: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.BORDER_COLOR,
  },
  button: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 5,
    color: "#fff",
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: '#fff',
    fontWeight: '700'
  }
});
