import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import { colors } from "../utils";
import PreviousSearches from './PreviousSearches'
import { OPENCAGE_API_KEY } from "@env";
import { MaterialIcons } from "@expo/vector-icons"; 
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../store/locations'

const api_url = "https://api.opencagedata.com/geocode/v1/json";

export default function SearchScreen({navigation}) {
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const { locations, currentLocation } = useSelector(state => state.locations)
  const dispatch = useDispatch()

  useEffect(() => {
    setQuery(currentLocation.latitude + "," + currentLocation.longitude);
  },[])

  const searchHandler = async(useCurrentLocation) => {
  let q = useCurrentLocation
    ? currentLocation.latitude + "," + currentLocation.longitude
    : query;
  let request_url =
    api_url +
    "?" +
    "key=" +
    OPENCAGE_API_KEY +
    "&q=" +
    encodeURIComponent(q) +
    "&pretty=1" +
    "&no_annotations=1" +
    "&limit=1";
  
    setErrorMessage(null);
    try {
      const response = await fetch(request_url);
      const result = await response.json();
      if (response.ok) {
        dispatch(locationsActions.addLocation(result.results[0].components))
        navigation.push("Details", { details: result.results[0].components })
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.searchSreen}>
      <Text>Type your location here:</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="City, State, Country"
      />
      <View style={styles.buttonsRow}>
        <Pressable
          style={styles.button}
          onPress={searchHandler.bind(null, false)}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        <TouchableHighlight
          style={styles.button}
          onPress={searchHandler.bind(null, true)}
        >
          <MaterialIcons name="my-location" size={24} color="#fff" />
        </TouchableHighlight>
      </View>
      {errorMessage && alert(errorMessage)}
      {locations.length > 0 && <PreviousSearches locations={locations} />}
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
    marginHorizontal: 0,
    paddingHorizontal: 10
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
  },
  buttonsRow:{
    flexDirection: "row",
    justifyContent: 'space-between'
  }
});
