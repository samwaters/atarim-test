import { css, Global } from "@emotion/react"
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider } from "@mui/material"
import reset from "emotion-reset"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddCity } from "./components/addcity/addcity.tsx"
import { Dashboard } from "./components/dashboard/dashboard.tsx"
import { Header } from "./components/header/header.tsx"
import { usePersist } from "./hooks/persist.ts"
import { closeCityModal, getCityModalOpen, getUIMode } from "./store/ui.reducer.ts"
import { darkTheme, theme } from "./theme.ts"

const globalStyles = (darkMode: boolean) => css`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
  html,
  body,
  #root {
    background-color: ${darkMode ? "black" : "white"};
    height: 100%;
    width: 100%;
  }
`

export const App = () => {
  const cityModalOpen = useSelector(getCityModalOpen)
  const mode = useSelector(getUIMode)
  const dispatch = useDispatch()
  const { enablePersist, hydrate } = usePersist()

  useEffect(() => {
    enablePersist()
    hydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dispatch(closeCityModal())
  }

  return (
    <>
      <Global styles={globalStyles(mode === "dark")} />
      <ThemeProvider theme={mode === "light" ? theme : darkTheme}>
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Header />
          <Dashboard />
        </Container>
        <Dialog open={cityModalOpen} onClose={handleClose}>
          <DialogTitle>Add Cities to Dashboard</DialogTitle>
          <DialogContent>
            <AddCity />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}
