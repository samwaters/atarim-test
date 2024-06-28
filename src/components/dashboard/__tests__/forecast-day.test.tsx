import { render, screen } from "@testing-library/react"
import { ForecastDay as Day } from "../../../api/types"
import { ForecastDay } from "../forecast-day.tsx"

const sampleDay: Day = {
  date: "2024-06-27",
  date_epoch: 1719446400,
  day: {
    maxtemp_c: 29.2,
    maxtemp_f: 84.6,
    mintemp_c: 17.8,
    mintemp_f: 64.1,
    avgtemp_c: 24.4,
    avgtemp_f: 75.9,
    maxwind_mph: 12.1,
    maxwind_kph: 19.4,
    totalprecip_mm: 0.32,
    totalprecip_in: 0.01,
    totalsnow_cm: 0.0,
    avgvis_km: 10.0,
    avgvis_miles: 6.0,
    avghumidity: 63,
    daily_will_it_rain: 1,
    daily_chance_of_rain: 87,
    daily_will_it_snow: 0,
    daily_chance_of_snow: 0,
    condition: {
      text: "Patchy rain nearby",
      icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
      code: 1063,
    },
    uv: 7.0,
  },
  astro: {
    sunrise: "05:49 AM",
    sunset: "09:58 PM",
    moonrise: "01:07 AM",
    moonset: "12:06 PM",
    moon_phase: "Waning Gibbous",
    moon_illumination: 71,
    is_moon_up: 1,
    is_sun_up: 0,
  },
  hour: [],
}

describe("Forecast Day", () => {
  it("Renders a forecast day", async () => {
    render(<ForecastDay day={sampleDay} useF={false} />)
    await expect(screen.getByText("Thu")).toBeInTheDocument()
    await expect(screen.getByText("17.8°")).toBeInTheDocument()
    await expect(screen.getByText("29.2°")).toBeInTheDocument()
  })

  it("Renders a forecast day using F", async () => {
    render(<ForecastDay day={sampleDay} useF={true} />)
    await expect(screen.getByText("Thu")).toBeInTheDocument()
    await expect(screen.getByText("64.1°")).toBeInTheDocument()
    await expect(screen.getByText("84.6°")).toBeInTheDocument()
  })
})
