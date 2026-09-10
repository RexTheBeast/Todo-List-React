import { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";

export default function TodosPage({token}) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState("");
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);


    useEffect(() => {
        if (!token) return;

        async function fetchTodos() {
            setIsTodoListLoading(true);
            setError("");

            try {
                const response = await fetch("/api/tasks?limit=100", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": token,
                },
                credentials: "include",
            });
            if (response.status === 200) {
                const data = await response.json();
                setTodoList(data.tasks);
            }else if (response.status === 401){
                throw new Error("unauthorized");
            }else{
                throw new Error("Failed to load todos");
            }
            } catch(err){
                setError(err.message || "Network error. Please try again.");
            } finally{
            setIsTodoListLoading(false);
            }
        }
    fetchTodos();
    }, [token]);


    async function updateTodo(editedTodo) {
        const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

        setTodoList((prev) =>
            prev.map((todo) =>
            todo.id === editedTodo.id ? { ...editedTodo } : todo
            )
        );
        try{
            const response = await fetch(`/api/tasks/${editedTodo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token,
            },
            credentials: "include",
            body: JSON.stringify({
                title: editedTodo.title,
                isCompleted: editedTodo.isCompleted,
            }),
            });

            if (!response.ok) {
                throw new Error("Failed to update todo");
            }
        } catch (err) {
            console.log(err)
            setTodoList((prev) =>
            prev.map((todo) =>
                todo.id === editedTodo.id ? originalTodo : todo
            )
            );

            setError("Failed to update todo. Please try again.");
        }
    }
        
    

    async function completeTodo(id){
        const originalTodo = todoList.find((todo) => todo.id === id);
        
        setTodoList((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: true } : todo
            )
        );

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "include",
                body: JSON.stringify({
                    isCompleted: true,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to complete todo");
            }
        } catch (err) {
            console.log(err)
            setTodoList((prev) =>
                prev.map((todo) =>
                    todo.id === id ? originalTodo : todo
                )
        );

        setError("Failed to complete todo. Please try again.");
        }
    }

    async function addTodo(todoTitle){
    const tempTodo = {
        id: Date.now(),
        title: todoTitle,
        isCompleted: false,
        isTemp: true
    };

    setTodoList(previous => [tempTodo, ...previous]);

    try{
      const response = await fetch("/api/tasks",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
            title: todoTitle,
            isCompleted: false,
        }),
      });  

      if (response.status === 201 || response.status === 200) {
        const realTodo = await response.json();

        setTodoList((previous) =>
            previous.map((todo) =>
                todo.id === tempTodo.id ? realTodo : todo
            )
        );
      } else {
        throw new Error("Failed to add todo");
        }
        } catch(err){
            console.log(err)
            setTodoList((previous)=>
                previous.filter((todo) => todo.id !== tempTodo.id)
            );
            setError("Failed to add todo. Please try again.");
        }
    }

    return (
    <div>
        {error && (
            <div style={{color: "red"}}>
                <p>{error}</p>
                <button onClick={() => setError("")}>Clear Error</button>
            </div>
        )}

        {isTodoListLoading && (
            <p>Loading todos...</p>
        )}
        <TodoForm onAddTodo={addTodo}></TodoForm>
        <TodoList 
        todoList={todoList} 
        onCompleteTodo={completeTodo}
        onUpdateTodo = {updateTodo}
        >
        </TodoList>
    </div>
    );
}