import { Done, Place } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { SearchResults } from "../../api/types.ts"
import { addCity, getCities, removeCity } from "../../store/dashboard.reducer.ts"

interface CityItemProps {
  city: SearchResults
}
export const CityItem = ({ city }: CityItemProps) => {
  const dispatch = useDispatch()
  const citiesOnDashboard = useSelector(getCities)
  const matchingCity = citiesOnDashboard.find((c) => c.name === city.name && c.lat === city.lat && c.lon === city.lon)

  const handleToggleCity = () => {
    dispatch(matchingCity ? removeCity(city) : addCity(city))
  }

  return (
    <Box onClick={handleToggleCity} sx={{ borderBottom: "1px solid #eee", display: "flex", gap: "10px", padding: "10px 0" }}>
      <Box>
        <Place color={matchingCity ? "error" : "inherit"} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">{city.name}</Typography>
        <Typography variant="body2">
          {city.region !== "" && `${city.region}, `}
          {city.country}
        </Typography>
      </Box>
      <Box sx={{ width: "24px" }}>{matchingCity && <Done color="success" />}</Box>
    </Box>
  )
}
