import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import Signup from "./components/signup";
import Profil from "./components/profil"


const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="*" element={<Navigate to="/" />}
    />
    </Routes>
  </BrowserRouter>,
  rootElement
);