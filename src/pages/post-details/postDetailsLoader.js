export default async function postDetailsLoader({ params }) {
    try {
        const postId = params.postId;
        const postUrl = import.meta.env.VITE_API_BASE + "/posts" + `/${postId}`;
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(postUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            serverError: "Something went wrong when trying to react the backend, please try again later..."
        }
    }
}
