import { createSelector } from "reselect";


const citiesStateSelector = (state:any) => state.cities;

export const getannouncementLoadingsSelector = createSelector(
  [citiesStateSelector],
  ({ loading = false }) => {
    return loading;
  }
);
export const getcitiesDataSelector = createSelector(
  [citiesStateSelector],
  ({ data = [] }) => {
    return data;
  }
);
