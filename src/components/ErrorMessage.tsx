import { getErrorMessage } from "../utils/errorMessages"

interface ErrorMessageProps {
    error:Error|null
}
const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if(!error)
    {
        return(null)
    }
       return(<p role="alert" className="text-sm text-brand-dark bg-brand-soft px-3.5 py-2.5 rounded-lg">{getErrorMessage(error)}</p>)

}

export default ErrorMessage
