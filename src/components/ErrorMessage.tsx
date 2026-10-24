import { getErrorMessage } from "../utils/errorMessages"

interface ErrorMessageProps {
    error:Error|null   
}
const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if(!error)
    {
        return(null)
    }
       return(<p style={{ color: "red", marginTop: "10px" }}>{getErrorMessage(error)}</p>) 
    
}

export default ErrorMessage