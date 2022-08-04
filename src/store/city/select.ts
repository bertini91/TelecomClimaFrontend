import { createSelector } from 'reselect';

const cityStateSelector = (state:any) => state.cities;

export const getannouncementLoadingsSelector = createSelector(
    [cityStateSelector],
    ({ loading = false }) => {
        return loading
    }
)
export const getcitiesDataSelector = createSelector(
    [cityStateSelector],
    ({ data = [] }) => {
        return data
    }
)