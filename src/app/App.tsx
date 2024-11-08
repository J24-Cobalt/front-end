import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import "./App.css";
import AppRouter from "./routes/components/AppRouter";

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
