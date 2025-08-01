import "./server-error.css";
import svg from "../../assets/images/server-down.svg";
import { useNavigate } from "react-router";
import Button from "../../components/button/Button";

export default function ServerError({
  message = "There seems to be a problem with the app's backend, please try again later...",
  navigateTo = -1
}) {
  const navigate = useNavigate();
  return <main className="server-error">
    <div className="title">
      <h1>Oops...</h1>
      <span className="code">
        500 error!
      </span>
      <span className="type">
        Server down.
      </span>
    </div>
    <img
      src={svg}
      alt="Server down image"
      className="image"
    />
    <p className="message">
      {message}
    </p>
    <Button
      onClick={() => navigate(navigateTo)}
    >
      Go back
    </Button>
  </main>
}
