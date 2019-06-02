// @flow
import { connect } from 'react-redux';
import { addTodo, updateTodo } from '../redux/actions/todos';
import Form from '../components/Form';
import { setTodo } from '../redux/actions/todo';
import { setMode } from '../redux/actions/mode';
import type { Todo as TodoType } from '../types/todo';
import type { Dispatch, State } from '../types';

const mapStateToProps = (state: TodoType) => ({
	todo: state.todo,
	mode: state.mode
});

const submit = todo => {
	return (dispatch, getState) => {
		todo.id || todo.id === 0
			? dispatch(updateTodo(todo))
			: dispatch(addTodo(todo));
		dispatch(closeForm());
	};
};

const closeForm = () => {
	return (dispatch: Dispatch, getState: State): void => {
		dispatch(setTodo(null));
		dispatch(setMode('list'));
	};
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => ({
	submit: todo => dispatch(submit(todo)),
	closeForm: () => dispatch(closeForm())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);
