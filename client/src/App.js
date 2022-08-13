import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import TodoView from "./components/TodoView";
import AddTodo from "./components/AddTodo";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
            <Route path="/login" element={<Login/>}></Route>
             <Route path="/" element={<Register/>}></Route> 
             <Route path="/todolist" element={<TodoView/>}></Route> 
             <Route path="/addtodo" element={<AddTodo/>}></Route> 

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
