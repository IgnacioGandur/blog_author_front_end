import "./protected.css";
import svg from "../../assets/images/protected-route.svg";
import { useSearchParams, useNavigate } from "react-router";
import Button from "../../components/button/Button";

export default function Protected() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return <main className="protected">
    <div className="title">
      <h1>Mmmm...</h1>
      <span className="code">
        401 error
      </span>
      <span className="type">
        Unauthorized!
      </span>
    </div>
    <img
      className="image"
      src={svg}
      alt="Protected route image"
    />
    <p className="message">
      {searchParams.get("message") || "The route you are trying to reach is only for users that are authors."}
    </p>
    <Button
      onClick={() => navigate("/", { replace: true })}
    >
      Go home
    </Button>
  </main>
}
