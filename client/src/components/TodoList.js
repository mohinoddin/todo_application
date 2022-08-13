import './todolist.css'
import React, { useState} from 'react';
const TodoList = ( {list} )=>{


    const [actionInital, setActionInital] = useState();
    console.log(actionInital)

    const handleLikeCount = (id) => {
        fetch("https://todo-mapp-backend.herokuapp.com/actions", {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
       activityId: id
      })

    }).then(res =>
      res.json()).then(result =>
        setActionInital(result.action)).catch(err => console.log(err))
    }
   
  if(list.length===0){
   return(
    <>
     No activity added please click on add activity
    </>

   )

  }else{

    return(
        <>
        <div className='todocontainer'>
       
       <table border='1'>
       <thead>     
        <tr className='tablehead' >
            <th className="thtext">Activity</th>
        
            <th className="thtext">Status</th>
       
            <th className="thtext timeth">Time Taken (Hrs:Min:Sec)</th>
        
            <th className="thtext">Action</th>
     
        
        </tr>
        </thead>
                
        {list.map((lsitData) => (
           
          <tbody>
          <tr className='tabledata'>
        <td className="tdtext ppdidtxt">{lsitData.activity}</td>
        <td className="tdtext">{lsitData.status}</td>
       
        <td className="tdtext">{lsitData.time}</td>
        <td className="tdtext" >
        <button  onClick={() => handleLikeCount(lsitData._id)} >{lsitData.action}</button>
        </td>
       
        </tr>
        </tbody>
      ))}      
       </table>
       </div>
       
        </>
    )
  }
    
}
export default TodoList


