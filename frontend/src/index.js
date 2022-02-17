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
const token = localStorage.getItem('token')

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App token={token} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);