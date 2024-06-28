import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface UIState {
  cityModalOpen: boolean
  mode: "light" | "dark"
}

const initialState: UIState = {
  cityModalOpen: false,
  mode: "light",
}

const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    closeCityModal: (state) => {
      state.cityModalOpen = false
    },
    darkMode: (state) => {
      state.mode = "dark"
    },
    lightMode: (state) => {
      state.mode = "light"
    },
    openCityModal: (state) => {
      state.cityModalOpen = true
    },
  },
})

export const { closeCityModal, darkMode, lightMode, openCityModal } = uiSlice.actions
export const getCityModalOpen = (state: RootState) => state.ui.cityModalOpen
export const getUIMode = (state: RootState) => state.ui.mode
export default uiSlice.reducer
