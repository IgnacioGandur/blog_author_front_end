import "./post-not-found.css";
import svg from "../../assets/images/404.svg";
import { useNavigate } from "react-router";
import Button from "../../components/button/Button.jsx";

export default function PostNotFound({ errors }) {
  const navigate = useNavigate();

  return <main className="post-not-found">
    <h1>
      Oops!
    </h1>
    <h2>
      We were not able to find the post you are looking for...
    </h2>
    <img
      className="image"
      src={svg}
      alt="Not found svg"
    />
    <div className="errors">
      <h3>Error Details</h3>
      <ul className="error-details">
        {errors && (
          errors.map((error) => {
            return <li
              key={error.path}
              className="error"
            >
              {error.msg}
            </li>
          })
        )}
      </ul>
    </div>
    <Button
      type="button"
      onClick={() => navigate("/")}
    >
      Take me back home!
    </Button>
  </main>
}
