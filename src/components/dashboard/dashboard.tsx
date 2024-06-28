import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { getCities } from "../../store/dashboard.reducer.ts"
import { Empty } from "./empty.tsx"
import { Forecast } from "./forecast.tsx"

export const Dashboard = () => {
  const cities = useSelector(getCities)

  return (
    <Box sx={{ height: "100%", paddingTop: "10px" }}>
      {cities.length === 0 && <Empty />}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {cities.map((c) => (
          <Forecast city={c} key={c.id} numberOfCities={cities.length} />
        ))}
      </Box>
    </Box>
  )
}
