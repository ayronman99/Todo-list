import { Component } from "react";

class TodoItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            task: this.props.doThis,
            isDone: false
        }
        this.editTodo = this.editTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.doneTask = this.doneTask.bind(this);
    }

    doneTask(){
        this.setState({
            isDone: true
        })
    }

    handleChange(e){
        this.setState({
            task : e.target.value
        })
    }

    editTodo(){
        this.setState({isEditing: !this.state.isEditing})
    }

    handleUpdate(e){
        e.preventDefault();
        this.props.toDoEdit(this.props.todoID, this.state.task)
        this.setState({isEditing: false})
    }

    render(){
        const {doThis, removeToDo} = this.props;
        const {isDone} = this.state;
        let todoData;
        if(this.state.isEditing){
            todoData = (
                <div className="todo-item">
                    <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
                        <input 
                        type='text' 
                        name='task'
                        value={this.state.task}
                        onChange={this.handleChange}
                        />
                        <button className="btn btn-sm btn-success ms-2">Save</button>
                    </form>
                </div>
            )
        } else {
            todoData = (
                <div className="todo-item">
                 {isDone && <span style={{margin:`${5}px`, fontSize:`${1.25}em`}}>✔️</span>}
                <li className={isDone ? 'todo-task done' : "todo-task"} onClick={this.doneTask}>{doThis}</li>
               

                 <div className="todo-utils">
                     {!isDone && <a href='#' onClick={this.editTodo}><i className="fa-solid fa-pencil"></i></a>}
                    
                    <a href='#' onClick={removeToDo}><i className="fa-solid fa-circle-minus"></i></a>
                   </div>
               </div>
            )
        }
        return todoData
    }
}

export default TodoItems;