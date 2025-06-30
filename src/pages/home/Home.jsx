import "./home.css";
import { useRouteLoaderData } from "react-router";
import ServerErrorMessage from "../../components/server-error-message/ServerErrorMessage";

export default function Home() {
  const data = useRouteLoaderData("root");

  return <main className="home">
    {data?.serverError && (
      <ServerErrorMessage errorMessage={data.serverError} />
    )}
    <div className="welcome-hero">
      <img
        className="image"
        src="https://images7.alphacoders.com/677/thumb-1920-677266.png"
        alt="Welcome hero image"
      />
      <div className="welcome-content">
        content
      </div>
    </div>
  </main>
}
