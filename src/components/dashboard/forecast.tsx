import { Delete, Menu, MenuOpen, Refresh } from "@mui/icons-material"
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SearchResults } from "../../api/types.ts"
import { weatherApi } from "../../api/weather.ts"
import { useResponsive } from "../../hooks/responsive.ts"
import { removeCity } from "../../store/dashboard.reducer.ts"
import { getDayTime } from "../../utils/date.ts"
import { ErrorBoundary } from "../errorboundary/errorboundary.tsx"
import { ForecastDay } from "./forecast-day.tsx"

interface ForecastProps {
  city: SearchResults
  numberOfCities: number
}

/**
 * Display current weather conditions for each city
 * including temperature, humidity, and wind speed.
 * Show a 5-day forecast for each city.
 */

export const Forecast = ({ city, numberOfCities }: ForecastProps) => {
  const dispatch = useDispatch()
  const { isSmall, noPointer } = useResponsive()
  const [forecast, { data, isError, isLoading, isSuccess }] = weatherApi.useLazyForecastQuery()
  const [useF, setUseF] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleRefresh = () => {
    forecast({ lat: city.lat, lon: city.lon }, false)
  }

  const handleRemove = () => {
    dispatch(removeCity(city))
  }

  const handleMouseEnter = () => {
    setMenuOpen(true)
  }

  const handleMouseLeave = () => {
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    forecast({ lat: city.lat, lon: city.lon }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ border: "1px solid #eee", borderRadius: "5px", flexBasis: numberOfCities === 1 || isSmall ? "100%" : "48%", flexGrow: 1, paddingBottom: "10px" }}>
      <ErrorBoundary>
        <Box sx={{ backgroundColor: "#eee", display: "flex", minHeight: "32px", padding: "10px" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {(isSmall || noPointer) && (
            <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", marginRight: "10px" }} onClick={toggleMenu}>
              {menuOpen ? <MenuOpen /> : <Menu />}
            </Box>
          )}
          {(!menuOpen || (menuOpen && !isSmall)) && (
            <Box sx={{ flex: 1, height: "40px" }}>
              <Typography variant="body2" component="div">
                {city.name}
              </Typography>
              <Typography variant="body2" component="div">
                {city.region && `${city.region}, `}
                {city.country}
              </Typography>
            </Box>
          )}
          {menuOpen && (
            <Box sx={{ alignItems: "center", display: "flex", gap: "10px", height: "40px", justifyContent: "center", flex: isSmall ? 1 : 0, marginRight: isSmall ? 0 : "10px" }}>
              <Button color="secondary" onClick={handleRefresh} size="small" startIcon={<Refresh />} variant="contained">
                Refresh
              </Button>
              <Button color="error" onClick={handleRemove} size="small" startIcon={<Delete />} variant="contained">
                Remove
              </Button>
            </Box>
          )}
          {!isLoading && isSuccess && (
            <Box sx={{ alignItems: "flex-end", flexDirection: "column", display: "flex" }}>
              <Typography variant="body2" component="div" fontSize={12}>
                {getDayTime(data.location.localtime_epoch, data.location.tz_id)}
              </Typography>
              <Typography variant="body2" component="div" fontSize={12}>
                {data.current.condition.text}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex" }}>
          {isError && !isLoading && <Alert severity="warning">Something went wrong, please refresh this widget</Alert>}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <CircularProgress size={25} />
            </Box>
          )}
          {!isLoading && isSuccess && (
            <>
              <Box sx={{ alignItems: "center", flexDirection: "column", display: "flex", width: "48px" }}>
                <img alt={data.current.condition.text} src={data.current.condition.icon} height={48} />
              </Box>
              <Box sx={{ alignItems: "center", display: "flex" }}>
                <Typography variant="body1" component="div" fontSize={32}>
                  {useF ? data.current.temp_f : data.current.temp_c}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flex: 1, gap: "3px", paddingTop: "5px" }}>
                <Typography variant="body1" component="div" fontWeight={useF ? 400 : 600} onClick={() => setUseF(false)}>
                  ℃
                </Typography>
                <Typography variant="body1" component="div">
                  |
                </Typography>
                <Typography variant="body1" component="div" fontWeight={useF ? 600 : 400} onClick={() => setUseF(true)}>
                  ℉
                </Typography>
              </Box>
              <Box sx={{ paddingRight: "10px", paddingTop: "5px" }}>
                <Typography variant="body2" component="div" color="secondary" fontSize={11}>
                  Humidity: {data.current.humidity}%
                </Typography>
                <Typography variant="body2" component="div" color="secondary" fontSize={11}>
                  Wind: {data.current.wind_mph} mph
                </Typography>
              </Box>
            </>
          )}
        </Box>
        {!isLoading && isSuccess && (
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            {data.forecast.forecastday.map((fD) => (
              <ForecastDay day={fD} key={fD.date_epoch} useF={useF} />
            ))}
          </Box>
        )}
      </ErrorBoundary>
    </Box>
  )
}
