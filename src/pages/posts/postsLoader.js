export default async function postsLoader({ request }) {
    try {
        const url = new URL(request.url);
        const categories = url.searchParams.getAll("categories");
        const searchTerm = url.searchParams.get("searchTerm");
        const apiParams = new URLSearchParams();
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (categories.length > 0) {
            categories.forEach(c => apiParams.append("categories", c));
        }

        if (searchTerm) {
            apiParams.set("searchTerm", searchTerm);
        }

        const baseUrl = import.meta.env.VITE_API_BASE + "/posts";
        const postsUrl = apiParams.toString() ? `${baseUrl}?${apiParams.toString()}` : baseUrl;

        const response = await fetch(postsUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            serverError: "Something went wrong when trying to fetch posts.",
        }
    }
}
