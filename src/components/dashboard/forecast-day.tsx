import { Box, Typography } from "@mui/material"
import { ForecastDay as Day } from "../../api/types.ts"
import { getShortDay } from "../../utils/date.ts"

interface ForecastDayProps {
  day: Day
  useF: boolean
}

export const ForecastDay = ({ day, useF }: ForecastDayProps) => {
  const date = new Date(day.date_epoch * 1000)
  return (
    <Box sx={{ backgroundColor: "#eee", borderRadius: "5px", padding: "0 10px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" component="div">
          {getShortDay(date)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={day.day.condition.icon} width={48} alt={day.day.condition.text} />
      </Box>
      <Box sx={{ display: "flex", gap: "5px " }}>
        <Typography variant="body2" component="div" fontSize={11} fontWeight={600}>
          {useF ? day.day.maxtemp_f : day.day.maxtemp_c}°
        </Typography>
        <Typography variant="body2" component="div" fontSize={11}>
          {useF ? day.day.mintemp_f : day.day.mintemp_c}°
        </Typography>
      </Box>
    </Box>
  )
}
