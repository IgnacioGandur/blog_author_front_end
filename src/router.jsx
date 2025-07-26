import { Navigate, createBrowserRouter } from "react-router";

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
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditPost from "./pages/edit-post/EditPost.jsx";
import PostDetails from "./pages/post-details/PostDetails.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import AccountSettings from "./pages/account-settings/AccountSettings.jsx";

// Components
import CheckIfUserIsAuthor from "./components/check-if-user-is-author/CheckIfUserIsAuthor.jsx";

// Loaders
import AppLoaderComponent from "./pages/app/AppLoaderComponent.jsx";
import appLoader from "./pages/app/appLoader.jsx";
import redirectIfLoggedLoader from "./loaders/redirectIfLogged.js";
import checkIfUserIsAuthor from "./loaders/checkIfUserIsAuthor.js";
import editPostLoader from "./pages/edit-post/editPostLoader.js";
import postsLoader from "./pages/posts/postsLoader.js";
import postDetailsLoader from "./pages/post-details/postDetailsLoader.js";
import createPostLoader from "./pages/create-post/createPostLoader.js";
import homeLoader from "./pages/home/homeLoader.js";
import accountSettingsLoader from "./pages/account-settings/accountSettingsLoader.js";

// Actions
import registerAction from "./pages/register/registerAction.js";
import loginAction from "./pages/login/loginAction.js";
import createPostAction from "./pages/create-post/createPostAction.js";
import editPostAction from "./pages/edit-post/editPostAction.js";
import postDetailsAction from "./pages/post-details/postDetailsAction.js";
import checkIfUserIsLogged from "./pages/dashboard/checkIfUserIsLogged.js";
import accountSettingsAction from "./pages/account-settings/accountSettingsAction.js";

const router = createBrowserRouter(
  [
    {
      id: "root",
      path: "/",
      Component: App,
      loader: appLoader,
      hydrateFallbackElement: <AppLoaderComponent />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          Component: Home,
          loader: homeLoader,
        },
        {
          path: "/posts",
          Component: Posts,
          loader: postsLoader,
          hydrateFallbackElement: <div>
            Loading posts and categories
          </div>
        },
        {
          path: "/posts/:postId",
          Component: PostDetails,
          loader: postDetailsLoader,
          action: postDetailsAction
        },
        {
          path: "/about",
          Component: About
        },
        {
          path: "/dashboard",
          Component: Dashboard,
          loader: checkIfUserIsLogged,
          children: [
            {
              index: true,
              element: <Navigate to="profile" replace />
            },
            {
              path: "/dashboard/profile",
              Component: Profile,
            },
            {
              path: "/dashboard/create-post",
              element: <CheckIfUserIsAuthor>
                <CreatePost />
              </CheckIfUserIsAuthor>,
              action: createPostAction,
              loader: createPostLoader,
            },
            {
              id: "edit-post",
              path: "/dashboard/my-posts/:postId/edit",
              Component: EditPost,
              loader: editPostLoader,
              action: editPostAction,
            },
            {
              path: "/dashboard/account-settings",
              Component: AccountSettings,
              action: accountSettingsAction,
              loader: accountSettingsLoader
            }
          ]
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
