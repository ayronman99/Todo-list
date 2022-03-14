import { Component } from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import './TodoList.css'

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.toDo = this.toDo.bind(this);
        this.editor = this.editor.bind(this);
    }

    toDo(todo){
        this.setState(currState => ({
            todos : [...currState.todos, todo]
        }))
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
             doThis={doThat.todo}
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
               </div>
                {todoMapping}
                <TodoForm addToDo={this.toDo}/>
               </div>
            </div>
        )
    }
}





export default TodoList;