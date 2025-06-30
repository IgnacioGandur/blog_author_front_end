import "./fieldset.css";

export default function Fieldset({
    className,
    legend,
    children
}) {
    return <fieldset className={`fieldset ${className}`}>
        <legend className="legend">
            {legend}
        </legend>
        {children}
    </fieldset>
}
