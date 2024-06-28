import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { weatherApi } from "./api/weather.ts"
import dashboardReducer from "./store/dashboard.reducer.ts"
import uiReducer from "./store/ui.reducer"

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, weatherApi.middleware]),
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    dashboard: dashboardReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
