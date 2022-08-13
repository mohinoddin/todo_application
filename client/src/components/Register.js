import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import validator from 'validator'
import './register.css'



const Register = () => {
    let navigate = useNavigate()

    const [signupData, setSignupData] = useState({ email: "", password: "", confirmpassword: "" })


    const handleSignup = () => {
        console.log(signupData);
        if (signupData.password === signupData.confirmpassword && signupData.password.length > 0 && signupData.email.length>0 && (validator.isEmail(signupData.email))) {
            axios({
                url: "https://todo-mapp-backend.herokuapp.com/signup",
                method: "POST",
                headers: {
                   
                },
                data: signupData,
               
            }).then((res) => {
                console.log(res)
            

                alert(res.data)
                navigate("/login")
                
            }).catch((err) => {
                
                alert(err.response.data)
                console.log(err)
            })
        } else {
            if (signupData.email.length === 0) {
                alert("email cannot be empty");
            }else if(!validator.isEmail(signupData.email)){
                alert("email is not valid")
            } 
             else if (signupData.password.length === 0) {
                alert("password cannot be empty")
            } 
            else{
                alert("password and confirm password should be same")
            }
        }
    }
    const navisignin = () => {
        navigate("/login")
    }
    return (
        <div className="signupcontainer">
             <div className="box">
              
                <p className="para">Register</p>
                {/* <form id="pushing" > */}
                    <div id="email">
                        <input className="signup-input" type="email" required placeholder="User Name" onChange={(e) => { setSignupData({ ...signupData, email: e.target.value }) }} />
                    </div>
                    <div id="password">
                        <input className="signup-input" type="password" required placeholder="Password" id="password" onChange={(e) => { setSignupData({ ...signupData, password: e.target.value }) }} />
                    </div>
                    <div id="confirmpassword">
                        <input className="signup-input" type="password" required placeholder=" Confirm password" id=" confirm password" onChange={(e) => { setSignupData({ ...signupData, confirmpassword: e.target.value }) }} />
                    </div>
                {/* </form> */}
                <button className="sign" onClick={()=>{handleSignup()}}>REGISTER</button>
                <p className="foot" onClick={navisignin}>Member Login</p>
            </div>
            
        </div>
    )
}
export default Register