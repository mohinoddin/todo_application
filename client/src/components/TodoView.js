import './todoview.css';
import TodoList from './TodoList'
import React, { useState, useEffect } from 'react';
import Logout from './Logout';

import { Link } from 'react-router-dom';
const TodoView = ()=>{

    const userId = localStorage.getItem("userid");
    const userName= userId.split('@')[0]

    

    const [list, setList] = useState([]);
    const authToken = localStorage.getItem("authorization");

    

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://todo-mapp-backend.herokuapp.com/gettask",{
        headers: {
            authorization: authToken
        }}); 
      // console.log(response)
      const data = await response.json(); 
      setList(data);
      // console.log(data);
    }
    fetchData()
  }, [authToken])
   
  //console.log(property)

    return(
        <>
       <div  className="maincontainer">
       <div  className="headerpart">
      <div style={headertext}>UserName : {userName}</div>
       </div>

       <div  className="bodypart">
       <div className="sidenav">
        <div style={sideview}>
        <div className='todotxt'>
            To Do List
        </div>
        <div>
            History
        </div>
        </div>

        <div style={logoutbtn} >
            <Logout />
            </div>
        
       </div>

       <div className="listpart" >

        <div className='addbtn'>
        <Link to='/addtodo'><button className="addtoobtn">Add New Activity</button></Link>
        </div>
        
        <div style={liststyle}> <TodoList list={list} /></div>
       
        
        </div> 
      
       </div>

       </div>
        </>
    )
}
export default TodoView

const sideview={
    marginTop: "30px",
    fontSize: "large",
    fontWeight: "bold",
}
const logoutbtn={
    marginBottom: "20px",
   
}

const headertext={
    marginRight: "30px",
    marginTop: "30px",
}

const liststyle={
    marginTop:"100px",
    display: "flex",
    justifyContent: "center"
}