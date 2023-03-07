import * as React from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JobDetail from "./components/JobDetail";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
          </Routes>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
