import {  useNavigate } from "react-router-dom"
import './todoview.css';

const Logout=()=>{
    const nav=useNavigate()
    const logoutHandle=()=>{

        localStorage.clear()

// localStorage.setItem("authorization","")
 nav("/")
    }

    return(
<button  className="logoubtn"onClick={logoutHandle}>Logout</button>
    )
}
export default Logout