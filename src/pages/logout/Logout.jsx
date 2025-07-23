import "./logout.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FadeLoader } from "react-spinners";
import FetchErrors from "../../components/fetch-error/FetchError";

export default function Logout() {
    const navigate = useNavigate();
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        async function logout() {
            try {
                const logoutUrl = import.meta.env.VITE_API_BASE + "/auth/users/logout";
                const fetchOptions = {
                    method: "post",
                    credentials: "include",
                };

                const response = await fetch(logoutUrl, fetchOptions);
                const result = await response.json();

                if (result.success) {
                    navigate("/", { replace: true });
                } else {
                    setFetchError("An error occurred when trying to log out from the app...");
                }
            } catch (error) {
                setFetchError("An error occurred when trying to log out from the app...");
            }
        };

        logout();
    }, [])

    if (fetchError) {
        return <FetchErrors
            errorCode={401}
            errorType="Unauthorized"
            errorMessage={fetchError}
            reloadPageFunction={null}
        />
    }

    return <main className="logout-loader">
        <FadeLoader
            color="#7678ed"
        />
        <p className="message">
            Logging out...
        </p>
    </main>
}
