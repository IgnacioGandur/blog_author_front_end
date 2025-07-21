export default async function postDetailsAction({ request, params }) {
    const { postId } = params;
    const formData = await request.formData();
    const comment = formData.get("comment");

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
    console.log("response is:", response);
    const result = await response.json();
    return result;
}
