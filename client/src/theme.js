import { createTheme } from "@mui/material";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#14314c",
    },
    secondary: {
      main: "#2b4bbd",
    },
    background: {
      default: "#FAFAFA",
      paper: "#E8E8E8",
    },
    text: {
      primary: "#000000",
    },
    success: {
      main: "#173918",
    },
    divider: "rgba(0,23,76,0.9)",
  },
  typography: {
    h5: {
      fontWeight: 600,
      lineHeight: 0.94,
      letterSpacing: "0.09em",
    },
    body1: {
      letterSpacing: "0.05em",
    },
    button: {
      fontSize: "0.8rem",
      letterSpacing: "0.14em",
    },
    overline: {
      letterSpacing: "0.09em",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
