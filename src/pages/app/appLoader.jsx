export default async function appLoader() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1250));

    const fetchUrl = "http://localhost:3000/api/users/me";
    const fetchOptions = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    };

    const response = await fetch(fetchUrl, fetchOptions);

    console.log(" the content of response in the app loader is:", response);

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      serverError: "There seems to be an error in the app's backend, some functionalities of the app may not work..."
    }
  }
}
