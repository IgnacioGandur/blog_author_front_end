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

        console.log("the content of selected categories is:", categories);

        const objectCategories = categories.map((category) => {
            return { id: category }
        })

        console.log("the content of objectCategories is:", objectCategories);

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

        // TODO: re-direct after successfull post creation.

        const response = await fetch(fetchPostUrl, fetchPostOptions);
        const result = await response.json();

        console.log("the content of result is:", result);

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
