import { useEffect } from "react";

import {
  useRouteLoaderData,
  useNavigate
} from "react-router";

export default function CheckIfUserIsAuthor({ children }) {
  const navigate = useNavigate();
  const userData = useRouteLoaderData("root");

  useEffect(() => {
    if (!userData?.user.isAuthor) {
      navigate("/");
    }
  }, []);

  if (userData?.user?.isAuthor) {
    return <>
      {children}
    </>
  }
}

