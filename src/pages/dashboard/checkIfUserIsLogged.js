import { redirect } from "react-router";

export default async function checkIfUserIsLogged() {
    try {
        const response = await fetch(import.meta.env.VITE_API_BASE + "/users/me", {
            credentials: "include"
        });
        const result = await response.json();

        if (!result || !result?.success) {
            return redirect("/");
        }

        return;
    } catch (error) {
        console.error("Dashboard loader error:", error);
    }
}
