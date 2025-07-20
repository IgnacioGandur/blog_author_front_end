import "./post-edition-errors.css";
import errorSvg from "../../../assets/images/no-data.svg";
import { useNavigate } from "react-router";

export default function PostEditionErrors({
  errorTitle,
  errors
}) {
  const navigate = useNavigate();
  return <section className="post-edition-error">
    <h1 className="title">
      Oops!
    </h1>
    <h2 className="sub-title">
      {errorTitle}
    </h2>
    <img
      className="image"
      src={errorSvg}
      alt="No data errors."
    />
    <ul className="errors">
      <h3>Errors details</h3>
      {errors.errors.map((error) => {
        return <li
          className="error"
          key={error.path}
        >
          {error.msg}
        </li>
      })}
    </ul>
    <button
      className="go-back-button"
      onClick={() => navigate(-1)}
    >
      Go back
    </button>
  </section>
}
