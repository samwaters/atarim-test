import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ForecastResults, LatLon, SearchResults } from "./types.ts"

const API_KEY = "81256061d2294ffe9e6121044242506"

export const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.weatherapi.com/v1/" }),
  endpoints: (builder) => ({
    forecast: builder.query<ForecastResults, LatLon>({
      query: (search) => `forecast.json?key=${API_KEY}&q=${search.lat},${search.lon}&days=5&aqi=no&alerts=no`,
    }),
    search: builder.query<SearchResults[], string>({
      query: (search) => `search.json?key=${API_KEY}&q=${search}`,
    }),
  }),
})
