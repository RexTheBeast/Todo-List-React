import { useRef } from 'react';
import { useState } from 'react';

function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTite] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) =>{
        event.preventDefault();

       if (workingTodoTitle.trim() === "") {
        return;
       }

       onAddTodo(workingTodoTitle);
       setWorkingTodoTite("");
       inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input 
            ref= {inputRef}
            type="text" 
            id="todoTitle"
            value= {workingTodoTitle}
            onChange={(e) => setWorkingTodoTite(e.target.value)}
            name = "todoTitle"
            placeholder={'Todo text'}
            required
            />
            <button type="submit" disabled={!workingTodoTitle.trim()}>Add Todo</button>
        </form>
    );
}

export default TodoForm