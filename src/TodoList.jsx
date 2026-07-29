export default function TodoList(){

    const todoList = [
        {id: 1, title: "Do Chores"},
        {id: 2, title: "Exerices"},
        {id: 3, title: "Do Homework"},
    ]
    return( 
        <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    )
}
