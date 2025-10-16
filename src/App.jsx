import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showPenTodo, setshowPenTodo] = useState(0)
   useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
     let secTodo = JSON.parse(todoString)
     setTodos(secTodo)
    }
   }, [])

useEffect(() => {
  const pending = todos.filter(todo => !todo.isCompleted).length;
  setshowPenTodo(pending);
}, [todos]); 

  const saveData = (data) => {
    localStorage.setItem("todos", JSON.stringify(data))
  }
       const handleEdit = (e,id) => {
          let t = todos.filter(i=> i.id === id)
           setTodo(t[0].todo)
           handleDelete(e,id)
       }
       const handleDelete = (e, id) => {
          let newTodos = todos.filter(item=>{
            return item.id!=id
          })
          setTodos(newTodos)
          saveData(newTodos)
       }  
       const handleAdd = () => {
        let newTodos = [...todos, {id: uuidv4(), todo , isCompleted: false}]
         setTodos(newTodos)
          setTodo("")
          saveData(newTodos)
       } 
        
       const handleChange = (e) => {
          setTodo(e.target.value)
       } 
       const handelCheckbox = (e) => {
          let id = e.target.name
          let index = todos.findIndex(item=>{
            return item.id === id
          })
          let newTodo = [...todos]
          newTodo[index].isCompleted = !todos[index].isCompleted
          setTodos(newTodo)
          saveData(newTodo)
       }
        const handelClear = () => {
           if(window.confirm("Do you want to remove all todos?")){
          setTodos([])
           }
        }
        
  return (
    <>
      <Navbar />
      <div className="bg-white md:mb-11 w-full md:w-[40%] md:m-auto md:mt-[3%] h-[100vh] md:h-[80vh] main">
        <div className="text flex justify-center md:justify-normal">
          <h1 className='text-3xl font-bold p-[40px]'>Todo App</h1>
        </div>
        <div className="input ml-[12%] flex items-center max-w-[87%]">
          <input className="border border-gray-500 p-2 w-[75%] focus:outline-gray-400 rounded-sm" type="text" placeholder='Add your new todo' value={todo} name={todo.id} onChange={handleChange} />
          <button className='p-2' onClick={handleAdd} disabled = {todo.length < 3}><span className="material-symbols-outlined bg-purple-600 p-[9px] m-[5px] text-white rounded-sm cursor-pointer hover:font-bold">
            add
          </span></button>
        </div>
          <div className="todos-container ml-[12%] mt-2 max-h-[330px] overflow-y-auto pr-2 " >
        {todos.map((item) =>{
           return <div className="todo1 bg-gray-300 w-[calc(75%+68px-10px)] h-[50px] flex justify-between items-center mb-2"  key={item.id}>
            <div className={item.isCompleted?"line-through" : ""}><p className='"text1 pl-5 m-auto'>{item.todo}</p></div>
            <div className='button flex items-center'>
              <input type="checkbox" className="mr-3 cursor-pointer" onChange={handelCheckbox} checked={item.isCompleted} name={item.id} />
            <button onClick={(e)=>{handleEdit(e,item.id)}}><span className="material-symbols-outlined bg-purple-600 p-[13px] text-white hover:font-bold">
              edit
            </span></button>
            <button  onClick={(e) => {handleDelete(e,item.id)}}><span className="material-symbols-outlined text-white p-[13px] bg-red-600 hover:font-bold">
              delete
            </span></button>
            </div>
          </div>
        })}
         </div>
           <footer className='w-[calc(75%+68px)]'>
            <div className="foot text-xl ml-[14%] mt-2 flex items-center justify-between">
              <p>
                You have {showPenTodo} pending tasks
              </p>
              <button className='bg-purple-600 p-[5px] text-white rounded-sm cursor-pointer hover:font-bold btn-0' onClick={handelClear}> Clear All</button>
            </div>
          </footer>
      </div>
    </>
  )
}

export default App
