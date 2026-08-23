import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

function App() {
  const [todoList, setTodoList] = useState([]);

  function completeTodo(id){
    const updatedTodos = todoList.map(todo => {
      if (todo.id === id) {
        return{
          ...todo,
          isCompleted: true
        };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  function addTodo(todoTitle){

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };

    setTodoList(previous => [newTodo, ...previous]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo}></TodoForm>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}></TodoList>
    </div>
  )
}

export default App
