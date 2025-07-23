import "./edit-post-loader.css";
import { HashLoader } from "react-spinners";

export default function EditPostLoader() {
  return <main className="edit-post-loader">
    <HashLoader
      color="#7678ed"
    />
    <p className="message">
      Updating post, please wait...
    </p>
  </main>
}
