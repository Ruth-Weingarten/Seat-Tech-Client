
interface ErrorMessageProps {
    message?: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        message!=null&&<p style={{ color: "red", marginTop: "10px" }}>
            error : {message}
        </p>
    )
}

export default ErrorMessage