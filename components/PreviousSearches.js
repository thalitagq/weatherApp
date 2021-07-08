import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchItem from './SearchItem'

export default function PreviousSearches() {
  return (
    <View>
      <Text style={styles.title}>Previous Searches</Text>
      <SearchItem />
      <SearchItem />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10
  }
})
