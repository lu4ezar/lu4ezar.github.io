// @flow
import * as React from 'react';
import { Fab, Icon } from '@material-ui/core/';

type Props = {
	canUndo: boolean,
	canRedo: boolean,
	undo: () => void,
	redo: () => void
};

const UndoRedo = ({ canUndo, canRedo, undo, redo }: Props) => (
	<div>
		<Fab disabled={!canUndo} onClick={undo}>
			<Icon>undo</Icon>
		</Fab>
		<Fab disabled={!canRedo} onClick={redo}>
			<Icon>redo</Icon>
		</Fab>
	</div>
);

export default UndoRedo;
