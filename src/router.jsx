import { createBrowserRouter } from "react-router";

// Pages
import App from "./pages/app/App.jsx";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Posts from "./pages/posts/Posts.jsx";
import About from "./pages/about/About.jsx";
import Logout from "./pages/logout/Logout.jsx";
import CreatePost from "./pages/create-post/CreatePost.jsx";
import Protected from "./pages/protected/Protected.jsx";
import ServerError from "./pages/server-error/ServerError.jsx";

// Loaders
import AppLoaderComponent from "./pages/app/AppLoaderComponent.jsx";
import appLoader from "./pages/app/appLoader.jsx";
import redirectIfLoggedLoader from "./loaders/redirectIfLogged.js";
import checkIfUserIsAuthor from "./loaders/checkIfUserIsAuthor.js";

// Actions
import registerAction from "./pages/register/registerAction.js";
import loginAction from "./pages/login/loginAction.js";

const router = createBrowserRouter(
  [
    {
      id: "root",
      path: "/",
      Component: App,
      loader: appLoader,
      hydrateFallbackElement: <AppLoaderComponent />,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "/posts",
          Component: Posts
        },
        {
          path: "/about",
          Component: About
        },
        {
          path: "/create-post",
          Component: CreatePost,
          loader: checkIfUserIsAuthor
        },
        // Route protector
        {
          path: "/protected",
          Component: Protected
        },
        // Auth routes
        {
          path: "/register",
          Component: Register,
          loader: redirectIfLoggedLoader,
          action: registerAction
        },
        {
          path: "/login",
          Component: Login,
          loader: redirectIfLoggedLoader,
          action: loginAction,
        },
        // Server error
        {
          path: "/server-error",
          Component: ServerError
        }
      ]
    },
    {
      path: "/logout",
      Component: Logout
    },
  ]
);

export default router;
