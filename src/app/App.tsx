import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
