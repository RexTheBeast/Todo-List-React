import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation'

function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef();

    const handleAddTodo = (event) =>{
        event.preventDefault();

       if (!isValidTodoTitle(workingTodoTitle)) return;

       onAddTodo(workingTodoTitle);
       setWorkingTodoTitle("");
       inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                labelText="Todo"
                elementId="todoTitle"
                ref= {inputRef}
                value= {workingTodoTitle}
                onChange={(e) => setWorkingTodoTitle(e.target.value)}
            >
            </TextInputWithLabel>
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
    );
}

export default TodoForm