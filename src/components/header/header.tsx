import { Add, DarkMode } from "@mui/icons-material"
import { AppBar, Box, Button, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useResponsive } from "../../hooks/responsive.ts"
import { darkMode, getUIMode, lightMode, openCityModal } from "../../store/ui.reducer"

export const Header = () => {
  const mode = useSelector(getUIMode)
  const dispatch = useDispatch()
  const { isMobile } = useResponsive()

  const handleModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target.checked ? darkMode() : lightMode())
  }

  const handleOpenCityModal = () => {
    dispatch(openCityModal())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Weather Forecast
            </Typography>
          </Box>
          <Box>
            <FormControlLabel control={<Switch checked={mode === "dark"} onChange={handleModeChange} />} label={<DarkMode />} />
          </Box>
          <Button color="secondary" onClick={handleOpenCityModal} startIcon={<Add />} variant="contained">
            {isMobile ? "Add" : "Add City"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
