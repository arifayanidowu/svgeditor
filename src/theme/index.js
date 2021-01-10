import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    type: "light",

    primary: {
      main: "#1976d2",
      // dark: "#1a237e",
      light: "#0176ff",
    },
    secondary: {
      // main: "#b71c1c",
      main: "#dc004e",
    },
    success: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    action: {
      // disabled: "rgba(255, 255, 255, 0.3)",
    },
    grey: {
      A400: "#3c3737",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: [
      "Rubik",
      "Quicksand",
      "Sacramento",
      "Parisienne",
      "Montez",
      "Lobster Two",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiInputLabel: {
      root: {
        background: defaultTheme.palette.type === "light" ? "#fff" : "#424242",
        zIndex: 999,
      },
    },
  },
});

export default theme;
