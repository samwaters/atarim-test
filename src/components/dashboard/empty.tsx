import { Box, Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { openCityModal } from "../../store/ui.reducer.ts"

export const Empty = () => {
  const dispatch = useDispatch()
  const handleAddCity = () => {
    dispatch(openCityModal())
  }

  return (
    <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", gap: "10px", height: "100%", justifyContent: "center", width: "100%" }}>
      <Typography variant="h6" component="div">
        No cities added yet
      </Typography>
      <Box>
        <Button color="secondary" onClick={handleAddCity} variant="contained">
          Add one now
        </Button>
      </Box>
    </Box>
  )
}
