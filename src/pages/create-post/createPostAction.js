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
        const intent = formData.get("intent");
        const categoryId = formData.get("categoryId");

        if (intent === "delete-category") {
            try {
                const deleteCategoryUrl = import.meta.env.VITE_API_BASE + `/categories/${categoryId}`;
                const fetchOptions = {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }

                const deleteCategoryResponse = await fetch(deleteCategoryUrl, fetchOptions);
                const deleteCategoryResult = await deleteCategoryResponse.json();
                return {
                    success: true,
                    message: deleteCategoryResult.message,
                }
            } catch (error) {
                return {
                    fail: true,
                    failMessage: "Failed to delete category, please try again later..."
                }
            }
        }

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

        const fetchPostUrl = import.meta.env.VITE_API_BASE + "/posts";
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
