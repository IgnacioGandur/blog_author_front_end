import { redirect } from "react-router";

export default async function redirectIfLoggedLoader() {
  const fetchUrl = import.meta.env.VITE_API_BASE + "/users/me";
  const fetchOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const result = await response.json();

    if (result.success) {
      return redirect("/");
    }

    return null;
  } catch (error) {
    redirect("/login");
  }
}
