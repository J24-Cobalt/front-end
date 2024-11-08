import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/AppRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
