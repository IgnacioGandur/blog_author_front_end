export default async function loginAction({ request }) {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        const loginUrl = import.meta.env.VITE_API_BASE + "/auth/users/login";
        const fetchOptions = {
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                password
            }),
        };

        const response = await fetch(loginUrl, fetchOptions);
        const result = await response.json();

        return result;

    } catch (error) {
        return {
            serverError: "Server error. It's seems like the backend of the app is not working correctly, please try again later...",
        }
    }
}
