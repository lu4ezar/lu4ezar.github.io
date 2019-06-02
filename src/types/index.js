// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { TodosStateWithHistory, TodosAction } from './todos';
import type { FilterState, FilterAction } from './filter';
import type { TodoState, TodoAction } from './currentTodoId';
import type { ModeState, ModeAction } from './mode';

export type ReduxInitAction = { type: '@@INIT' };

export type State = TodosStateWithHistory & FilterState & TodoState & ModeState;

export type Action =
	| ReduxInitAction
	| TodosAction
	| FilterAction
	| TodoAction
	| ModeAction
	| NotificationAction;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;
