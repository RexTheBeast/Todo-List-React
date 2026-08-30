import { useEditableTitle } from "../../hooks/useEditableTitle";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoListItem({todo, onCompleteTodo, onUpdateTodo}){
    const{
        isEditing,
        workingTitle,
        startEditing,
        cancelEdit,
        updateTitle,
        finishEdit
    } = useEditableTitle(todo.title);

    const handleUpdate = (event) => {
        if(!isEditing) return;

        event.preventDefault();

        if(!isValidTodoTitle(workingTitle)) return;

        onUpdateTodo({
            ...todo,
            title: workingTitle
        });

        finishEdit();
    };

    const handleCancel = cancelEdit;

    const handleEdit = (event) => {
        updateTitle(event.target.value);
    };

    return(
        <>  
            <li>
                <form onSubmit={handleUpdate}>
                    {isEditing ? (
                        <>
                            <TextInputWithLabel
                                elementId={`edit-${todo.id}`}
                                value={workingTitle}
                                labelText="Edit Todo"
                                onChange={handleEdit}
                            >
                            </TextInputWithLabel>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isValidTodoTitle(workingTitle)}
                            >
                                Update
                            </button>
                        </>
                    )  : (
                        <>
                            <label>
                                <input 
                                    type="checkbox"
                                    id={`checkbox${todo.id}`}
                                    checked={todo.isCompleted} 
                                    onChange={() => onCompleteTodo(todo.id)}
                                />
                            </label>
                            <span onClick={startEditing}>
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