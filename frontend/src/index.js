import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Login from "./components/login";
import Signup from "./components/signup";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);