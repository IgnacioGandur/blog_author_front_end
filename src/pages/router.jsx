import { createBrowserRouter } from "react-router";
import App from "./pages/app/App.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
    }
  ]
);

export default router;
