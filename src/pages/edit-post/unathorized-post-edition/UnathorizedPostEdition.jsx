import "./unathorized-post-edition.css";
import svg from "../../../assets/images/unauthorized.svg";
import { useNavigate } from "react-router";
import Button from "../../../components/button/Button";

export default function UnauthorizedPostEdition() {
  const navigate = useNavigate();

  return <section className="unauthorized-post-edition">
    <h1
      className="title"
    >
      Mmmm...
    </h1>
    <h2 className="sub-title">You are not the author of the post you are trying to update.</h2>
    <img
      className="image"
      src={svg}
      alt="Decorative svg image"
    />
    <Button
      onClick={() => navigate(-1)}
    >
      Go back
    </Button>
  </section>
}
