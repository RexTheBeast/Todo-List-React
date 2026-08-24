import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation'

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
            <TextInputWithLabel
                lableText="Todo"
                elementId="todoTitle"
                ref= {inputRef}
                value= {workingTodoTitle}
                onChange={(e) => setWorkingTodoTite(e.target.value)}
            >
            </TextInputWithLabel>
            <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>
        </form>
    );
}

export default TodoForm