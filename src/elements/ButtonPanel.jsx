// @flow
import React from "react";
import { IconButton, Toolbar } from "@material-ui/core";
import {
  RemoveRedEye as ViewIcon,
  Edit as EditIcon,
  CheckBox,
  CheckBoxOutlineBlank,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import type { Id, Todo } from "../types/todo";

type ButtonPanelProps = {
  todo: Todo,
  mode: ?string,
  toggle: (id: Id) => void,
  deleteTodo: (id: Id) => void,
  showTodo: (id: Id, string) => void,
};

const ButtonPanel = ({
  todo,
  mode,
  toggle,
  deleteTodo,
  showTodo,
}: ButtonPanelProps) => {
  const { id, status } = todo;
  return (
    <Toolbar style={{ marginLeft: "auto" }}>
      <IconButton title="View details" onClick={() => showTodo(id, "view")}>
        <ViewIcon />
      </IconButton>
      <IconButton
        title="Edit"
        onClick={() => showTodo(id, "edit")}
        disabled={status === "completed"}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title="Mark as Completed"
        onClick={() => toggle(id)}
        disabled={status === "completed"}
      >
        {status === "completed" ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </IconButton>
      <IconButton title="Delete Todo" onClick={() => deleteTodo(id)}>
        <DeleteIcon />
      </IconButton>
    </Toolbar>
  );
};

export default ButtonPanel;
