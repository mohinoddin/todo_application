import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddTodo = () => {

    let navigate = useNavigate();
    const [addTodo, setAddTodo] = useState([]);
    const authToken = localStorage.getItem("authorization");
    const isEnabled = (addTodo.activity !== undefined)

    if (isEnabled) {

    }
    const handleUserAdd = () => {
        
        axios({
            url: "https://todo-mapp-backend.herokuapp.com/addtask",
            method: "POST",
            headers: {
                authorization: authToken
            },
            data: addTodo
        }).then((res) => {
            // window.location.href='/post'
            console.log(res)
            navigate("/todolist", { replace: true });
        }).catch((err) => {
            console.log(err.response.data)
            if(err.response.data==='Activity already exist'){
                alert("Activity already exist please enter other activity")
            }
        })
    }
    const handleInputChange = (e, id) => {
        setAddTodo({ ...addTodo, [id]: e.target.value })

    }





    return (
        <>
            <div className="main">
            

                <div className="Post2" style={main}>
                    <div  style={form}>

                        <div className="inpt" style={input}>
                            <label for='activity'  style={labletxt}>Activity Name : </label>
                            <input type='text' id='activity' placeholder="activity" onChange={(e) => { handleInputChange(e, 'activity') }} style={{ width: "350px", paddingLeft: "10px" }}></input>
                        </div>
                        <button className="formbtn" onClick={handleUserAdd} disabled={!isEnabled} style={{ padding: "2px 14px" }}>Add Todo</button>
                    </div>

                </div>
            </div>
        </>
    )
}


const main = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    textAlign: "center",
    position: "relative",
    top: "100px",
};
const form = {
    border: "1px solid silver",
    padding: "20px",
    borderRadius: "4px"
}
const input = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
}
const labletxt={
    marginRight: "20px",
}
export default AddTodo;