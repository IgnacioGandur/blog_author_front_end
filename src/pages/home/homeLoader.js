export default async function homeLoader() {
    try {
        const postsUrl = import.meta.env.VITE_API_BASE + "/posts";
        const fetchOptions = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(postsUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            serverError: "Something went wrong when trying to retrieve posts...",
        }
    }
}
