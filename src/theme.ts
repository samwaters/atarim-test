import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      light: "#449236",
      main: "#367424",
      dark: "#285612",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#704286",
      main: "#622474",
      dark: "#540262",
      contrastText: "#ffffff",
    },
    mode: "light",
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#ffffff",
      secondary: "#eeeeee",
      disabled: "#666666",
    },
  },
  typography: {
    body1: {
      color: "white",
    },
  },
})
