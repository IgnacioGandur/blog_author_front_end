import { redirect } from "react-router";

export default async function createPostAction({ request }) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const formData = await request.formData();
        const title = formData.get("title");
        const shortDescription = formData.get("shortDescription");
        const readTime = formData.get("readTime");
        const content = formData.get("content");
        const imageUrl = formData.get("imageUrl");
        const categories = formData.getAll("categories");
        const objectCategories = categories.map((category) => {
            return { id: category }
        })

        const fetchPostUrl = "http://localhost:3000/api/posts";
        const fetchPostOptions = {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title,
                shortDescription,
                readTime,
                content,
                imageUrl,
                categories: objectCategories,
            })
        }

        const response = await fetch(fetchPostUrl, fetchPostOptions);
        const result = await response.json();

        if (result.success) {
            return redirect(`/dashboard/your-posts/${result.post.id}/edit`);
        }

        return result;
    } catch (error) {
        return {
            serverError: "Server error: Something went wrong when trying to create a post.",
        }
    }
}
