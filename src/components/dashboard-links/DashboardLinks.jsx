import "./dashboard-links.css";
import { NavLink } from "react-router";

export default function DashboardLinks() {
    const links = [
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
    ];
    return <aside className="vertical-navbar">
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
    </aside>
}
