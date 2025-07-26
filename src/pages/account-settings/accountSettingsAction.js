import { redirect } from "react-router";
export default async function acountSettingsAction({ request }) {
    try {
        const formData = await request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const profilePictureUrl = formData.get("profilePictureUrl");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const userUrl = import.meta.env.VITE_API_BASE + "/users/me";

        // Handle account deletion.
        const deleteAccountPassword = formData.get("deletePass");
        if (deleteAccountPassword) {
            try {
                const deleteUserUrl = import.meta.env.VITE_API_BASE + "/users";
                const fetchOptions = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        password: deleteAccountPassword
                    })
                }
                const deleteAccountResponse = await fetch(deleteUserUrl, fetchOptions);
                const deleteAccountResult = await deleteAccountResponse.json();

                if (!deleteAccountResult.success) {
                    return {
                        userInputErrors: true,
                        errorResult: deleteAccountResult,
                    }
                }

                if (deleteAccountResult.success) {
                    return redirect(`/?message=${encodeURIComponent("Your account was deleted successfully.")}`)
                }
            } catch (error) {
                return {
                    fail: true,
                    message: "There seems to be problems in the backend, we were not able to delete your account, please try again later..."
                }
            }
        }

        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                firstName,
                lastName,
                profilePictureUrl,
                password,
                confirmPassword
            })
        }

        const response = await fetch(userUrl, fetchOptions);
        const result = await response.json();

        if (!result?.success) {
            return {
                userInputErrors: true,
                errorResult: result,
            }
        }

        return {
            success: true,
            message: result.message
        }
    } catch (error) {
        return {
            fail: true,
            message: "There seems to be problems in the backend, we were not able to update your profile...",
        }
    }
}
