import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , ActivityIndicator, Button } from 'react-native';
import * as  Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { WEATHER_API_KEY } from "@env";
import { colors } from './utils';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './components/SearchScreen';
import Details from './components/Details';
import { Provider } from 'react-redux';
import store from "./store";
import { useDispatch } from 'react-redux'
import { locationsActions } from './store/locations'


const BASE_WEATHER_URL ="https://api.openweathermap.org/data/2.5/weather?";

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Home"
      component={Home}
      options={{ animationEnabled: false }}
    />
    <RootStack.Screen
      name="Search"
      component={SearchScreen}
      options={{ animationEnabled: false }}
    />
    <RootStack.Screen
      name="Details"
      component={Details}
      options={{ animationEnabled: false }}
    />
  </RootStack.Navigator>
);

const Home = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const dispatch = useDispatch()

  useEffect(() => {
    const ac = new AbortController();
    load();
    return () => ac.abort();
  }, [unitSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      dispatch(locationsActions.setCurrentLocation({ latitude, longitude }))
      const wheaterUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(wheaterUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <Button
          title="Search"
          onPress={() =>
            navigation.push("Search")
          }
        />
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitSystem={unitSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
};

export default function App() {
  return (
     <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
     </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main:{
    justifyContent: 'center',
    flex: 1
  }
});
