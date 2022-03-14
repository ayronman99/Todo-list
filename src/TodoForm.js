import { Component } from "react";
import {v4 as uuidv4} from 'uuid'; 
import './NewTodoForm.css';


class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            todo: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const newDoItem = { ...this.state, id: uuidv4() }
        this.props.addToDo(newDoItem);
        this.setState({todo: ''})
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render(){
        return(
            <div className='todo-submitter'>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="todo">Add a Todo:</label>
                    <input 
                    id="todo" 
                    name='todo' 
                    value={this.state.todo}
                    placeholder="What to do?!?!"
                    onChange = {this.handleChange}
                    />

                    <button className="btn btn-sm btn-success ms-1">Include</button>
              </form>
            </div>
        )
    }
}


export default TodoForm;