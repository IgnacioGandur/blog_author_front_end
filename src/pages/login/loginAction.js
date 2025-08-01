import { redirect } from "react-router";
export default async function loginAction({ request }) {
    try {
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

        if (!result.success) {
            return {
                validationFail: true,
                result: result,
            }
        }

        return redirect("/");
    } catch (error) {
        return {
            fail: true,
            message: "Server error. It's seems like the backend of the app is not working correctly, please try again later...",
        }
    }
}
