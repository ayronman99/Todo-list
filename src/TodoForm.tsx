import React, {ReactElement, useContext} from "react";
import { TextField, Paper } from "@mui/material";
import useInputState from "./hooks/useInputState";
import { DispatcherContext } from "./context/todos.context";
import { dispatcherHandler, TodoActionObjectType } from "./@types/todos";

function TodoForm(): ReactElement {
  const [value, handleChange, reset] = useInputState("");
  const dispatchTodos = useContext(DispatcherContext) as dispatcherHandler<TodoActionObjectType>;

  return (
    <Paper>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatchTodos({type: "ADD", task: value})
          reset();
        }}
      >
        <TextField
          value={value}
          onChange={handleChange}
          label="Add New Todo"
          fullWidth
        />
      </form>
    </Paper>
  );
}

export default TodoForm;
