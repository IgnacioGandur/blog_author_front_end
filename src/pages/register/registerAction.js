export default async function registerAction({ request }) {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const formData = await request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const registerUrl = import.meta.env.VITE_API_BASE + '/auth/users/register'
        const fetchOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                password,
                confirmPassword
            })
        }

        const response = await fetch(registerUrl, fetchOptions);
        const result = await response.json();
        return result;

    } catch (error) {
        return {
            serverError: "Server error. It's seems like the backend of the app is not working correctly, please try again later..."
        }
    }
}
