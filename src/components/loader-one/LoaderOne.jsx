import "./loader-one.css";
import { BarLoader } from "react-spinners";

export default function LoaderOne({
    message
}) {
    return <main className="loader-one">
        <BarLoader
            color="#7678ed"
        />
        <p className="loading-message">
            {message}
        </p>
    </main>
}
