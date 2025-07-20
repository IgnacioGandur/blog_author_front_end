import { redirect } from "react-router";

export default async function editPostLoader({ params }) {
    try {
        const { postId } = params;
        const fetchUrl = `${import.meta.env.VITE_API_BASE}/posts/${postId}`;
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        };

        const response = await fetch(fetchUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return redirect("/server-error");
    }
}
