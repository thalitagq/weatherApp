import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from './locations'

const store = configureStore({
  reducer: {
    locations: locationsReducer,
  },
});

export default store
