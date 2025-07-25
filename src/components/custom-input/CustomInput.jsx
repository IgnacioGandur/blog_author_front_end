import "./custom-input.css";
import { useState } from "react";

export default function CustomInput({
    googleIcon = "person",
    labelText = "Placeholder Text",
    inputType = "text",
    roundBorders = true,
    inputName,
    inputPlaceholder,
    required = true,
    value,
    onChange,
    constraintsMessage
}) {

    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility() {
        setShowPassword((prevState) => !prevState);
    }

    return <div className="custom-input">
        <label className="label" htmlFor={inputName}>
            <span className="text">
                {labelText}
            </span>
            {required && (
                <i className="required-message">
                    Required
                </i>
            )}
        </label>
        <div className={`input-and-icon ${roundBorders && "round-borders"}`}>
            <span className="material-symbols-rounded icon">
                {googleIcon}
            </span>
            <div className="vertical-separator"></div>
            <input
                className="input"
                type={inputType !== "password" ? inputType : showPassword ? "text" : "password"}
                name={inputName}
                id={inputName}
                placeholder={inputPlaceholder}
                required={required}
                value={value}
                onChange={(e) => onChange(e, inputName)}
            />
            {inputType === "password" && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`toggle-password-visibility-button ${roundBorders && "round-borders"}`}
                >
                    <span className="material-symbols-rounded">
                        {showPassword ? "visibility_off" : "visibility"}
                    </span>
                </button>
            )}
        </div>
        <p className="constraints-message">
            {constraintsMessage}
        </p>
    </div>
}
