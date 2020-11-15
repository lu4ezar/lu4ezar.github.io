// @flow
import * as React from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Fab,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Close as CloseIcon, Check as CheckIcon } from "@material-ui/icons";
// import getExpireState from "../../utils/luxon";
import Drawer from "../Drawer";
import Header from "../Header";
import type { Props } from "./types";
import { TodoPriorityValues, TodoStatusValues } from "../../generated/graphql";
import type { Todo } from "../../generated/graphql";
import { useCreateTodo, useUpdateTodo, useGetTodo } from "../../apollo/hooks";

const initialState: Todo = {
  id: "",
  title: "",
  description: "",
  priority: TodoPriorityValues.Normal,
  status: TodoStatusValues.Active,
  created: null,
};

const Form = ({ id, mode, closeForm }: Props): React.Node => {
  const { todo, loading } = useGetTodo(id);
  const [state, setState] = React.useState<Todo>(initialState);
  const { createTodo } = useCreateTodo(state);
  const { updateTodo } = useUpdateTodo({ ...state });

  React.useEffect(() => {
    if (id && todo) {
      setState(todo);
    }
  }, [id, todo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateTodo(todo.id, { ...state });
    } else {
      createTodo();
    }
    closeForm();
    setState(initialState);
  };

  const clearForm = () => {
    if (id) {
      setState(todo);
    } else {
      setState(initialState);
    }
  };

  const onChange = (name) => (event: SyntheticInputEvent<HTMLInputElement>) => {
    // $FlowFixMe
    setState({ ...state, [(name: string)]: event.currentTarget.value });
  };

  const handleSelectChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const disableClearButton = !state.title && !state.description;
  const disableSubmitButton =
    JSON.stringify(todo) === JSON.stringify(state) ||
    !state.title ||
    !state.description;

  return (
    <Drawer side="right" open={mode !== "list"} toggleDrawer={closeForm}>
      <form data-testid="form" id="form" onSubmit={onSubmit}>
        <Header
          text={`${
            mode === "form"
              ? "Add new"
              : mode.charAt(0).toUpperCase() + mode.slice(1)
          } todo`}
        />
        {loading ? (
          <Skeleton variant="rect" width={300} height={500} />
        ) : (
          <fieldset disabled={mode === "view"}>
            <TextField
              id="title"
              label="Title"
              value={state.title}
              onChange={onChange("title")}
              margin="normal"
              required
            />
            <br />
            <TextField
              id="description"
              label="Description"
              multiline
              rowsMax="4"
              value={state.description}
              onChange={onChange("description")}
              margin="normal"
              required
            />
            <br />
            <FormControl>
              <InputLabel htmlFor="priority">Priority</InputLabel>
              <Select
                value={state.priority || TodoPriorityValues.Normal}
                onChange={handleSelectChange}
                inputProps={{
                  name: "priority",
                  id: "priority",
                }}
              >
                <MenuItem value={TodoPriorityValues.Low}>Low</MenuItem>
                <MenuItem value={TodoPriorityValues.Normal}>Normal</MenuItem>
                <MenuItem value={TodoPriorityValues.High}>High</MenuItem>
              </Select>
            </FormControl>
            <br />
            {/* <InputLabel htmlFor="date">Date&Time:</InputLabel>
          <TextField
            id="date"
            value={state.date}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange("date")}
          />
          <TextField
            id="time"
            value={state.time}
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            onChange={onChange("time")}
          /> */}
          </fieldset>
        )}
        {mode !== "view" && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Fab
              color="secondary"
              size="small"
              onClick={clearForm}
              disabled={disableClearButton}
            >
              <CloseIcon />
            </Fab>
            <Fab
              data-testid="submit"
              type="submit"
              color="primary"
              size="small"
              form="form"
              disabled={disableSubmitButton}
            >
              <CheckIcon />
            </Fab>
          </div>
        )}
      </form>
    </Drawer>
  );
};

export default Form;
