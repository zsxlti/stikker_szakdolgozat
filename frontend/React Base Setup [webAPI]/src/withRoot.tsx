import * as React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
// It's optional.
const defaultTheme = createMuiTheme
({
  palette:
  {
    common:
    {
      black: "#000",
      white: "#fff"
    },
    primary:
    {
      light: "#7986cb",
      main: "rgb(103, 170, 209)",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary:
    {
      light: "#ff4081",
      main: "rgba(231, 10, 10, 1)",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error:
    {
      light: "#e57373",
      main: "rgba(244, 187, 54, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text:
    {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    background:
    {
      paper: "#fff",
      default: "#fafafa"
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography:
  {
    useNextVariants: true,
    fontSize: 10,
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    // Use the system font instead of the default Roboto font.
    fontFamily:
    [
      "Maven Pro"
    ].join(",")
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xs: 768,
      sm: 1024,
      md: 1280,
      lg: 1425,
      xl: 1920
    }
  }
});

const theme =
{
  ...defaultTheme,
  overrides:
  {}
}

function withRoot<P>(Component: React.ComponentType<P>)
{
  function WithRoot(props: P)
  {
    // MuiThemeProvider makes the theme available down the React tree thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;