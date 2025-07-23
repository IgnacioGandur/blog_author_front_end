import { redirect } from "react-router";

export default async function createPostAction({ request }) {
    try {
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

        // Handle category creation
        const createCategory = formData.get("createCategory");
        if (createCategory) {
            const createCategoryUrl = import.meta.env.VITE_API_BASE + `/categories`;
            const fetchOptions = {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: createCategory,
                })
            }

            const response = await fetch(createCategoryUrl, fetchOptions);
            const createCategoryResult = await response.json();
            createCategoryResult.categoryCreated = createCategoryResult.success
            return createCategoryResult;
        }

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
            return redirect(`/dashboard/my-posts/${result.post.id}/edit?message=${encodeURIComponent("Post created successfully! But your post is not automatically published, you have to do it manually in the 'published status' section.")}`);
        }

        return result;
    } catch (error) {
        return {
            serverError: "Server error: Something went wrong when trying to create a post.",
        }
    }
}
