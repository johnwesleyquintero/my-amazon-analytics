
"use client"

import * as React from "react"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954', // Spotify green
    },
    secondary: {
      main: '#191414', // Spotify black
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Circular", "Helvetica", "Arial", sans-serif',
  },
});

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        {children}
      </NextThemesProvider>
    </MuiThemeProvider>
  );
}
