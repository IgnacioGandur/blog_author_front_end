import "./not-found.css";
import svg from "../../assets/images/404.svg";
import { NavLink } from "react-router";

export default function NotFound() {
  return <main className="not-found-page">
    <header>
      <h1>Mmmm...</h1>
      <h2>Seems like the page you are looking for doesn't exists...</h2>
    </header>
    <img
      src={svg}
      alt="Not found svg"
    />
    <div className="wrapper">
      <p>
        The page you are looking for doesn't exist.
      </p>
      <NavLink
        to="/"
        className="link"
      >
        Go home
      </NavLink>
    </div>
  </main>
}
