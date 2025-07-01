import "./navbar.css";
import { useState, useEffect } from "react";
import {
    NavLink,
    useRouteLoaderData,
} from "react-router";

export default function Navbar() {
    const [showProfileOptions, setShowProfileOptions] = useState(false);
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

    function toggleProfileOptions() {
        setShowProfileOptions(prevState => !prevState);
    }

    // Handle escape key pressing to deselect/unfocus links.
    useEffect(() => {
        function handleEscapeKey(e) {
            if (e.key === "Escape") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                    setShowProfileOptions(false);
                }
            }
        }

        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        }
    }, [showProfileOptions])

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
        {/* TODO: fix this button's style. */}
        {data && data.success ? (
            <button
                onClick={toggleProfileOptions}
                className="logged-options"
            >
                <div className="ppf-username">
                    <div className="ppf-wrapper">
                        <img
                            className="profile-picture"
                            src={data.user.profilePictureUrl}
                            alt="User profile picture"
                        />
                    </div>
                    <span className="username">
                        {data.user.firstName} {data.user.lastName}
                    </span>
                </div>
                {showProfileOptions && (
                    <div className="options">
                        <NavLink
                            className="option"
                            to="/profile"
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            className="option"
                            to="/logout"
                        >
                            Logout
                        </NavLink>
                    </div>
                )}
            </button>
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
