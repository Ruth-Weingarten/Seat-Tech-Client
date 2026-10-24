import { useState } from "react"
import RegisterCompany from "../components/RegisterCompany"
import RegisterUser from "../components/RegisterUser"


const RegisterPage = () => {
    const [regist,setRegist]=useState<string>("company")
return(
    <>
    <div className="toggle">
       <div className={`toggle-thumb ${regist === 'join' ? 'right' : ''}`}></div>
         <button type="button"   className={regist === 'company' ? 'active' : ''}
 onClick={()=>{
        setRegist("company")
    }}>COMPANY</button>
    <button  type="button" className={regist === 'join' ? 'active' : ''} onClick={()=>
        {
            setRegist("join")
        }
    }>USER</button>
    </div>
   
    {regist!='company'?<RegisterUser></RegisterUser>:
    <RegisterCompany></RegisterCompany>}
    </>
)

}
export default RegisterPage
