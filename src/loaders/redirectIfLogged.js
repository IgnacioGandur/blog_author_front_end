import { redirect } from "react-router";

export default async function redirectIfLoggedLoader() {
  const fetchUrl = "http://localhost:3000/api/users/me";
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
