import './App.css'

function App() {
  const todoList = [
    {id: 1, title: "Do Chores"},
    {id: 2, title: "Exerices"},
    {id: 3, title: "Do Homework"},
  ]
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
