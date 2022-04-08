import { Component } from "react";
import { Modal, Button } from "react-bootstrap";


class TodoItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            task: this.props.doThis,
            todoItemDone: this.props.taskStatus
        }
        this.editTodo = this.editTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
/* All functions for the component section */
    
    doneTask(){
        this.props.isTaskUpdated(this.props.todoID, true)
        this.setState({
            todoItemDone: true,
            isDoneTask: false
        })
    }


    handleShow(){
        this.setState({
            isDoneTask: true
        })
    }

    handleClose(){
        this.setState({ isDoneTask: false })
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
/* All functions for the component section above


 Render is found below
*/
    render(){
        const {doThis, removeToDo} = this.props;
        const {todoItemDone} = this.state;
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
                 {todoItemDone && <span style={{margin:`${5}px`, fontSize:`${1.25}em`}}>✔️</span>}
                <li className={todoItemDone ? 'todo-task done' : "todo-task"} onClick={this.handleShow}>{doThis}</li>

                    <Modal
                        show={this.state.isDoneTask}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Is the task done?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           Are you sure you have done this task?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                            Not yet!
                            </Button>
                            <Button variant="primary" onClick={this.doneTask}>Indeed, it is done!</Button>
                        </Modal.Footer>
                    </Modal>
                    

                 <div className="todo-utils">
                     {!todoItemDone && <a href='#' onClick={this.editTodo}><i className="fa-solid fa-pencil"></i></a>}
                    
                    <a href='#' onClick={removeToDo}><i className="fa-solid fa-circle-minus"></i></a>
                   </div>
               </div>
            )
        }
        return todoData
    }
}

export default TodoItems;