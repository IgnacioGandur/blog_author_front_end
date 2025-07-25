import "./dashboard-links.css";
import {
    useRouteLoaderData,
    NavLink,
} from "react-router";

export default function DashboardLinks() {
    const userData = useRouteLoaderData("root");
    console.log("user data in dashboard links:", userData);
    const links = userData?.user?.isAuthor ? [
        {
            icon: "account_circle",
            path: "/profile",
            text: "Profile"
        },
        {
            icon: "contextual_token_add",
            path: "/create-post",
            text: "Create post"
        },
    ] : [
        {
            icon: "account_circle",
            path: "/profile",
            text: "Profile"
        },
    ];
    return <header className="dashboard-links">
        {links.map((link) => {
            return <NavLink
                key={link.path}
                to={`/dashboard${link.path}`}
                className={({ isActive }) => isActive ? "active link" : "link"}
            >
                <span className="material-symbols-rounded icon">
                    {link.icon}
                </span>
                <span className="text">
                    {link.text}
                </span>
            </NavLink>
        })}
    </header>
}
