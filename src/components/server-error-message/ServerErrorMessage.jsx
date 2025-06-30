import "./server-error-message.css";

export default function ServerErrorMessage({
    errorMessage
}) {
    return <div className="server-error-message">
        <p className="message">
            {errorMessage}
        </p>
    </div>
}
