import { redirect } from "react-router";

export default async function editPostAction({ request, params }) {
    try {
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
        const intent = formData.get("intent");

        // Handle post deletion.
        if (intent === "delete-post") {
            try {
                const postUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}`;
                const fetchOptions = {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                }

                const deletePostResponse = await fetch(postUrl, fetchOptions);
                const deletePostResult = await deletePostResponse.json();
                if (deletePostResult.success) {
                    return redirect(`/dashboard/profile?message=${deletePostResult.message}`)
                }
            } catch (error) {
                return {
                    fail: true,
                    failMessage: "Something went wrong, we were not able to delete the post, please try again later..."
                }
            }
        }

        // Handle post update
        const postUrl = `${import.meta.env.VITE_API_BASE}/posts/${postId}`;
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

        const editPostResponse = await fetch(postUrl, fetchOptions);
        const editPostResult = await editPostResponse.json();
        return {
            success: true,
            message: editPostResult.message
        }
    } catch (error) {
        return {
            fail: true,
            failMessage: "Something went wrong when trying to update your post, please try again later..."
        }
    }
}
