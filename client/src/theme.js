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
    divider: "rgba(0,23,76,0.4)",
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
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});
