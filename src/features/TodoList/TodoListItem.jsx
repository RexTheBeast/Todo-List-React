import { useState } from "react"
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({todo, onCompleteTodo}){
    const [isEditing, setIsEditing]= useState(false);
    return(
        <>  
            <li>
                <form>
                    {isEditing ? (
                        <TextInputWithLabel
                            elementId={`edit-${todo.id}`}
                            value={todo.title}
                            lableText="Edit Todo"
                            onChange={() => {}}
                            ref={null}
                        >
                        </TextInputWithLabel>
                    )  : (
                        <>
                            <input 
                                type="checkbox"
                                checked={todo.isCompleted} 
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                            <span onClick={() => setIsEditing(true)}>
                            {todo.title}
                            </span>
                        </>
                    )}
                </form>
            </li>
        </>
    )
}

export default TodoListItem