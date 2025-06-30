import "./input-errors.css";

export default function InputErrors({ errors }) {
    return <div className="input-errors">
        <p className="message">{errors.message}</p>
        <ul className="container">
            {errors.errors.map((error) => {
                return <li
                    className="error"
                    key={error.path}
                >
                    {error.msg}
                </li>
            })}
        </ul>
    </div>
}
