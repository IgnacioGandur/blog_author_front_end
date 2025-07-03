import { redirect } from "react-router";

export default async function checkIfUserIsAuthor() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const fetchUrl = "http://localhost:3000/api/users/me";
    const response = await fetch(fetchUrl, {
      credentials: "include"
    });
    const result = await response.json();

    if (!result.success) {
      return redirect("/login?message=onlyAuthorsRoute");
    }

    if (!result.user?.isAuthor) {
      return redirect(`/protected?message=${encodeURIComponent("The route you are trying to reach is for authors only.")}`);
    }

    return result;
  } catch (error) {
    return redirect("/server-error");
  }
}

