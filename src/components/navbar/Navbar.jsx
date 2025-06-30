import "./navbar.css";
import {
    NavLink,
    useRouteLoaderData,
} from "react-router";

export default function Navbar() {
    const data = useRouteLoaderData("root");

    const links = [
        {
            path: "/",
            text: "Home",
        },
        {
            path: "/posts",
            text: "Posts",
        },
        {
            path: "/about",
            text: "About",
        },
    ];

    return <nav className="navbar">
        <div className="logo">
            <span className="material-symbols-rounded icon">
                computer
            </span>
            <h2>
                Ignacio's Blog <span className="author">Author</span>
            </h2>
        </div>
        <div className="links">
            {links.map((link) => {
                return <NavLink
                    key={link.text}
                    className={({ isActive }) => isActive ? "active link" : "link"}
                    to={link.path}
                >
                    {link.text}
                </NavLink>
            })}
        </div>
        {data && data.success ? (
            <NavLink
                className="link"
                to="/logout"
            >
                Logout
            </NavLink>
        ) : (
            <div className="sign-links">
                <NavLink
                    className="link login"
                    to="/login"
                >
                    Log In
                </NavLink>
                <NavLink
                    className="link sign-up"
                    to="/register"
                >
                    Sign Up
                </NavLink>
            </div>
        )}
    </nav>
}
