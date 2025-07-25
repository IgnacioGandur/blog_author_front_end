export default async function postDetailsAction({ request, params }) {
    const { postId } = params;
    const formData = await request.formData();
    const comment = formData.get("comment");
    const intent = formData.get("intent");
    const updatedComment = formData.get("updatedComment");
    const commentId = formData.get("commentId");

    // Handle like remotion from comment.
    if (intent === "removeLikeFromComment") {
        try {
            const commentLikeUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${commentId}/likes`;
            const fetchOptions = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }

            const removeLikeResponse = await fetch(commentLikeUrl, fetchOptions);
            const removeLikeResult = await removeLikeResponse.json();
            return;
        } catch (error) {
            return {
                fail: true,
                failMessage: "We were not able to remove the like from that comment, please try again later"
            }
        }
    }

    // Handle like on user comments.
    if (intent === "likeComment") {
        try {
            const likeCommentUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${commentId}/likes`;
            const fetchOptions = {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }
            const likeCommentResponse = await fetch(likeCommentUrl, fetchOptions);
            const likeCommentResult = await likeCommentResponse.json();
            return;
        } catch (error) {
            return {
                fail: true,
                failMessage: "We were not able to like that comment, please try again later..."
            }
        }
    }

    // Handle comment update.
    if (updatedComment) {
        try {
            const commentUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${commentId}`;
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
            return {
                success: true,
                message: commentUpdateResult.message
            };
        } catch (error) {
            return {
                fail: true,
                failMessage: "Not able to update comment, try again later..."
            }
        }
    }

    //Handle like to post.
    if (intent === "like-post") {
        try {
            const likePostUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/likes`;
            const fetchOptions = {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
            const likePostResponse = await fetch(likePostUrl, fetchOptions);
            const likePostResult = await likePostResponse.json();
            return;
        } catch (error) {
            return {
                fail: true,
                failMessage: "Not able to like post, try again later..."
            }
        }
    }

    // Handle like remotion from post.
    if (intent === "removePostLike") {
        try {
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
            return;
        } catch (error) {
            return {
                fail: true,
                failMessage: "Not able to remove like from post, try again later..."
            }
        }
    }

    // Handle own comment deletion.
    if (intent === "deleteComment") {
        try {
            const commentUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments/${commentId}`
            const fetchOptions = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }

            const deleteCommentResponse = await fetch(commentUrl, fetchOptions);
            const deleteCommentResult = await deleteCommentResponse.json();
            return {
                success: true,
                message: deleteCommentResult.message
            }
        } catch (error) {
            return {
                fail: true,
                failMessage: "Not able to delete comment, try again later..."
            }
        }
    }

    // Handle comment on post
    if (intent === "commentPost") {
        try {
            const commentPostUrl = import.meta.env.VITE_API_BASE + `/posts/${postId}/comments`
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

            const commmentPostResponse = await fetch(commentPostUrl, fetchOptions);
            const commentPostResult = await commmentPostResponse.json();
            return {
                success: true,
                message: commentPostResult.message
            };
        } catch (error) {
            return {
                fail: true,
                failMessage: "Not able to comment post, try again later..."
            }
        }
    }
}
