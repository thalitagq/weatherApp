import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("location", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("location");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    return null
  }
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState:{
    locations: [],
    currentLocation: getData()
  },
  reducers:{
    addLocation: (state, action) => {
      if (state.locations.length === 3) {
        state.locations[0] = action.payload
      }
      const isInLocations = state.locations.some( location => location.city === action.payload.city)
      if (!isInLocations) {
        state.locations.push(action.payload)
      }
    },
    setCurrentLocation: (state, action) =>{
      state.currentLocation = {...action.payload}
      storeData(action.payload);
    }
  }
})

export const locationsActions = locationsSlice.actions;
export default locationsSlice.reducer;