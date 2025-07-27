import { redirect } from "react-router";

export default async function checkIfUserIsAuthor() {
  try {
    const fetchUrl = import.meta.env.VITE_API_BASE + "/users/me";
    const response = await fetch(fetchUrl, {
      credentials: "include"
    });
    const result = await response.json();

    if (!result.success) {
      return redirect(`/?message=` + encodeURIComponent("The route you are trying to reach is only for logged users."));
    }

    if (!result.user?.isAuthor) {
      return redirect("/?message=" + encodeURIComponent("The route you are trying to reach is only for authors."));
    }

    return result;
  } catch (error) {
    return redirect("/server-error");
  }
}

