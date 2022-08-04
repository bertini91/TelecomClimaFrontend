import { createSlice } from "@reduxjs/toolkit";
import { string } from "yup";
import { iCities } from "../../interfaces";

const initialState: iCities = {
  data: [],
  limit: 5,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCitiesData: (state, action) => {
      state.data = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCitiesData } = citiesSlice.actions;
export default citiesSlice.reducer;
