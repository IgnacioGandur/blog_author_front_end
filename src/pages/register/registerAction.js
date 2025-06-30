export default async function registerAction({ request }) {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const formData = await request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        const response = await fetch("http://localhost:3000/api/auth/users/register", {
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
        })

        const result = await response.json();
        return result;

    } catch (error) {
        return {
            serverError: "Server error. It's seems like the backend of the app is not working correctly, please try again later..."
        }
    }
}
