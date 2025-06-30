import "./button.css";

export default function Button({
    children,
    className = "button",
    roundBorders = false,
    type = "button",
    onClick = null
}) {
    return <button
        className={`${className} ${roundBorders && "round-borders"}`}
        type={type}
        onClick={onClick}
    >
        {children}
    </button>
}
