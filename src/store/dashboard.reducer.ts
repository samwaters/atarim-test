import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SearchResults } from "../api/types.ts"
import { RootState } from "../store"

export interface DashboardState {
  cities: SearchResults[]
}

const initialState: DashboardState = {
  cities: [],
}

const dashboardSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    addCity: (state, action: PayloadAction<SearchResults>) => {
      state.cities.push(action.payload)
    },
    hydrateCities: (state, action: PayloadAction<SearchResults[]>) => {
      state.cities = action.payload
    },
    removeCity: (state, action: PayloadAction<SearchResults>) => {
      state.cities = state.cities.filter((c) => c.name !== action.payload.name || c.lat !== action.payload.lat || c.lon !== action.payload.lon)
    },
  },
})

export const { addCity, hydrateCities, removeCity } = dashboardSlice.actions
export const getCities = (state: RootState) => state.dashboard.cities
export default dashboardSlice.reducer
