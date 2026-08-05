import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle){
    const newTodo = {
      id: Date.now(),
      title: todoTitle
    };

    setTodoList(previous => [newTodo, ...previous]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo}></TodoForm>
      <TodoList todoList={todoList}></TodoList>
    </div>
  )
}

export default App
