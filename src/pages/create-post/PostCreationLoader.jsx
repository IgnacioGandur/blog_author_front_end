import "./post-creation-loader.css";
import { ScaleLoader } from "react-spinners";

export default function PostCreationLoader() {
  return <div className="post-creation-loader">
    <ScaleLoader
      color="#7678ed"
    />
    <p className="message">
      Creating your post...
    </p>
  </div>
}
