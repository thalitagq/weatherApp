import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchItem from './SearchItem'

export default function PreviousSearches({locations}) {
  return (
    <View>
      <Text style={styles.title}>Previous Searches</Text>
      {locations.map((item) => (
        <SearchItem
          key={item.city}
          city={item.city}
          state={item.state}
          country={item.country}
        />
      ))}
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
