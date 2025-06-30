import "./app-loader-component.css";
import { FadeLoader } from "react-spinners";

export default function AppLoaderComponent({
  loadingMessage = "Please wait, the app is loading..."
}) {
  return <main className="app-loader">
    <FadeLoader
      color="#7678ed"
    />
    <p className="message">
      {loadingMessage}
    </p>
  </main>
}
