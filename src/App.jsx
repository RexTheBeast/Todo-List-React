import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

const todos = [
        {id: 1, title: "Do Chores"},
        {id: 2, title: "Exerices"},
        {id: 3, title: "Do Homework"},
    ]

function App() {
  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm></TodoForm>
      <TodoList todoList={todoList}></TodoList>
    </div>
  )
}

export default App
