import { Component } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import './TodoList.css';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: JSON.parse(localStorage.getItem("todos") || "[]")
        }
        this.toDo = this.toDo.bind(this);
        this.editor = this.editor.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }
    componentDidMount() {
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
      }


    componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
      }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem('todos', JSON.stringify(this.state[key]));
        }
      }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toDo(todo){
        this.setState(currState => ({
            todos : [...currState.todos, todo]
        })  
        )
    }

    editor(id, updateTask){
        const updateTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, todo: updateTask}
            }
            return todo;
        })
        this.setState({todos: updateTodos})
    }

    remover(id){
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    render(){
        const todoMapping = this.state.todos.map(doThat => (
             <TodoItems 
             key={doThat.id}
             doThis={this.capitalizeFirstLetter(doThat.todo)}
             todoID={doThat.id}
             removeToDo={() => this.remover(doThat.id)}
             toDoEdit={this.editor}
             />
        ))


        return(
            <div className="todo-container">
               <div className="todo-pseudo-container">
               <div className="top-header">
                <h1>Todo List!</h1>
                    <p>A simple thought of doing something is not enough! Create a Todo list instead then do it!!</p>

               <OverlayTrigger
                placement={'top'}
                overlay={
                    <Tooltip id='toptip'>
                     If you have finished a task, you can click on the task to cross it out.
                    </Tooltip>
                }
               >
                   <Button className='toolbtn' variant="success"><i className="fa-solid fa-circle-info"></i></Button>
               </OverlayTrigger>
               </div>
               {this.state.todos < 1 ? <h2>No Tasks yet! Add one!</h2> : todoMapping}
                <TodoForm addToDo={this.toDo} todoArr={this.state.todos}/>
               </div>
            </div>
        )
    }
}





export default TodoList;