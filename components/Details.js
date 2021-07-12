import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../utils";

export default function Details({route}) {
  const [details , setDetails] = useState(null)
  
  useEffect(() => {
    setDetails(route.params.details)
  }, [route.params.details])

  return (
    <View style={styles.details}>
      {details && (
        <>
          <Text style={styles.title}>City</Text>
          <Text style={styles.text}>{details.city}</Text>
          <Text style={styles.title}>Continent</Text>
          <Text style={styles.text}>{details.continent}</Text>
          <Text style={styles.title}>Country</Text>
          <Text style={styles.text}>{details.country}</Text>
          <Text style={styles.title}>Municipality</Text>
          <Text style={styles.text}>{details.municipality}</Text>
          <Text style={styles.title}>Region</Text>
          <Text style={styles.text}>{details.region}</Text>
          <Text style={styles.title}>State</Text>
          <Text style={styles.text}>{details.state}</Text>
        </>
      )}
      {!details && (
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  details:{
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  title: {
    fontWeight: '700',
    color: colors.PRIMARY_COLOR
  },
  text: {
    color: '#333',
    marginBottom: 10
  }
})