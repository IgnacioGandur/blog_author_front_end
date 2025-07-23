export default async function appLoader() {
  try {
    const fetchUrl = import.meta.env.VITE_API_BASE + "/users/me";
    const fetchOptions = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    };

    const response = await fetch(fetchUrl, fetchOptions);
    const result = await response.json();

    console.log("result in app loader is:", result);

    return result;
  } catch (error) {
    return {
      serverError: "There seems to be an error in the app's backend, some functionalities of the app may not work..."
    }
  }
}
