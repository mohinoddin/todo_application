import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'



const Login = () => {

   
   
    let navigate = useNavigate()

    const naviSignup = () => {
        navigate("/resetpassword")
    }
    const [signindata, setSignindata] = useState({ email:"", password:"" })

    const handleLogin = () => {
        if(signindata.email.length){
        axios({
           
            url: "https://todo-mapp-backend.herokuapp.com/login",
            method: "POST",
            headers: {
                

            },
            data: signindata
        }).then((data) => {       

            if(data.data.authToken.length>0){
                localStorage.setItem("authorization", data.data.authToken);
                 localStorage.setItem('userid',signindata.email)
                 alert(`${signindata.email} signed in sucessfully`)
                navigate("/todolist")
            }
        }).catch((err) => {
            alert(err.response.data)
            
        
        })

    }else{
        alert("email cann't be empty")
    }

    }

    return (
        <div className="logincontainer">
            <div className="logbox">
          
            <p  className="paragraph2">Member Login</p>
            {/* <form > */}
                <div>
                <input className="logininput1" placeholder="User Name" type="text" onChange={(e) => { setSignindata({ ...signindata, email: e.target.value }) }} />
                </div>
                <div className="input-wrapper">
                <input  className="logininput2"placeholder="Password" type="password" onChange={(e) => { setSignindata({ ...signindata, password: e.target.value }) }} />
               
                </div>
                <button className="signin" onClick={handleLogin}>Login</button>
                <p className="btn" onClick={naviSignup}>Forgot Password</p>
                </div>
                
             {/* </form> */}
            
           
        </div>
    )
}

export default Login
