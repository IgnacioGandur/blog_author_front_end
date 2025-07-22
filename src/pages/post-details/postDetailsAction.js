export default async function postDetailsAction({ request, params }) {
    try {
        const { postId } = params;
        const formData = await request.formData();
        const comment = formData.get("comment");
        const deleteComment = formData.get("deleteComment");
        const intent = formData.get("intent");
        const updatedComment = formData.get("updatedComment");
        const commentId = formData.get("commentId");

        // Handle comment update.
        if (updatedComment) {
            const commentUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${commentId}`;
            console.log("comment url:", commentUrl);
            const fetchOptions = {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    content: updatedComment
                })
            }

            const response = await fetch(commentUrl, fetchOptions);
            const commentUpdateResult = await response.json();
            console.log("comment update result is:", commentUpdateResult);
            return {
                commentUpdated: true,
                commentUpdateResult
            };
        }

        //Handle like to post.
        if (intent === "like-post") {
            const likePostUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/likes`;
            const fetchOptions = {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
            const response = await fetch(likePostUrl, fetchOptions);
            const likePostResult = await response.json();
            return likePostResult;
        }

        // Handle like remotion.
        if (intent === "remove-post-like") {
            const likeUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/likes`;
            const fetchOptions = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            };

            const response = await fetch(likeUrl, fetchOptions);
            const removeLikeResult = await response.json();
            return removeLikeResult;
        }

        // Handle comment deletion.
        if (deleteComment) {
            const commentUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${deleteComment}`
            const fetchOptions = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }

            const response = await fetch(commentUrl, fetchOptions);
            const result = await response.json();
            return result;
        } else {
            const postUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments`
            const fetchOptions = {
                method: "post",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    content: comment
                }),
            }

            const response = await fetch(postUrl, fetchOptions);
            const result = await response.json();
            return result;
        }
    } catch (error) {
        return {
            serverError: "Something went wrong with the app's backend, please try again later..."
        }
    }
}
