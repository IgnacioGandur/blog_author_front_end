export default async function accountSettingsLoader() {
    const url = import.meta.env.VITE_API_BASE + "/users/me";
    const fetchOptions = {
        method: "get",
        credentials: "include",
    }

    const response = await fetch(url, fetchOptions);
    const result = await response.json();
    return result;
}
