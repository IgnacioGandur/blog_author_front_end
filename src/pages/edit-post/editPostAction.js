export default async function editPostAction({ request, params }) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { postId } = params;
        const formData = await request.formData();

        const title = formData.get("title");
        const content = formData.get("content");
        const imageUrl = formData.get("imageUrl");
        const shortDescription = formData.get("shortDescription");
        const readTime = formData.get("readTime");
        const isPublished = formData.get("isPublished") === "on";
        const categories = formData.getAll("categories");
        const categoriesObject = categories.map((n) => ({ id: n }));
        const fetchUrl = `${import.meta.env.VITE_API_BASE}/posts/${postId}`;
        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(
                {
                    title,
                    content,
                    imageUrl,
                    shortDescription,
                    readTime,
                    isPublished,
                    categories: categoriesObject
                }
            )
        }

        const response = await fetch(fetchUrl, fetchOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        return {
            serverError: error,
        }
    }
}
