import { createTheme } from "@mui/material";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#f00",
    },
    secondary: {
      main: "#0f0",
    },
  },
  shape: {
    borderRadius: 7,
  },
  spacing: 8,
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "green",
      },
    },
    MuiInputLabel: {
      root: {
        backgroundColor: "yellow",
      },
    },
    MuiTextField: {
      root: {},
    },
    MuiButton: {
      root: {
        textTransform: "none",
        padding: "20px",
      },
      fullWidth: {
        maxWidth: "300px",
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      variant: "contained",
      color: "primary",
    },
    MuiCheckbox: {
      disableRipple: true,
    },
    MuiTextField: {
      variant: "filled",
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiPaper: {
      elevation: 12,
    },
    MuiCard: {
      elevation: 12,
    },
  },
});
