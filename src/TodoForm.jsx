function TodoForm(){
    return (
        <form action="">
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle"/>
            <button type="submit" disabled>Add Todo</button>
        </form>
    );
}

export default TodoForm