// @flow
import {
	ADD_TODO,
	TOGGLE_TODO,
	UPDATE_TODO,
	DELETE_TODO,
	REORDER
} from './actionTypes';
import type { Id, Todo, TodosAction } from '../../types/todos';
import type { DropResult } from 'react-beautiful-dnd';

export const addTodo = (todo: Todo): TodosAction => ({
	type: ADD_TODO,
	todo
});

export const deleteTodo = (id: Id): TodosAction => ({
	type: DELETE_TODO,
	id
});

export const toggleTodo = (id: Id): TodosAction => ({
	type: TOGGLE_TODO,
	id
});

export const updateTodo = (todo: Todo): TodosAction => ({
	type: UPDATE_TODO,
	todo
});

export const reorderTodos = (result: DropResult): TodosAction => ({
	type: REORDER,
	result
});
