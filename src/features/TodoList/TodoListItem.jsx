import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import { useEditableTitle } from "../../hooks/useEditableTitle";

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

        const finalTitle = finishEdit();

        onUpdateTodo({
            ...todo,
            title: finalTitle
        });
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
                                lableText="Edit Todo"
                                onChange={handleEdit}
                                ref={null}
                            >
                            </TextInputWithLabel>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleUpdate}
                                disabled={!isValidTodoTitle(workingTitle)}
                            >
                                Update
                            </button>
                        </>
                    )  : (
                        <>
                            <input 
                                type="checkbox"
                                checked={todo.isCompleted} 
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                            <span onClick={() => startEditing(true)}>
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