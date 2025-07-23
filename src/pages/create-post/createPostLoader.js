export default async function createPostLoader() {
    try {
        const categoriesUrl = import.meta.env.VITE_API_BASE + `/categories`;
        const fetchOptions = {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(categoriesUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            serverError: "The app's backend it's not working..."
        }
    }
}
