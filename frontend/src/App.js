import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Groupomania</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          textAlign: "right",
          marginRight: "2rem"
        }}
      >
        <Link to="/Signup">Signup</Link> |{" "}
        <Link to="/Login">Login</Link>
      </nav>
    </div>
  );
}