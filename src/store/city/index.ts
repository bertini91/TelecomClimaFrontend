import { createSlice } from "@reduxjs/toolkit";
import { ICity } from "../../interfaces";

const initialState: ICity = {
  data: {
    name: "",
    id: "",
  },
};

export const citiesSlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityData: (state, action) => {
      state.data = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCityData } = citiesSlice.actions;
export default citiesSlice.reducer;
