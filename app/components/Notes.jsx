/* @flow */
import React           from 'react';
import Note            from './Note';
import Editable        from './Editable';
import LaneActions     from '../actions/LaneActions';
import type {NoteType} from '../types/types';

type Props = {
  notes        : Array<NoteType>,
  onValueClick : (id: string) => any,
  onEdit       : (id: string) => any,
  onDelete     : (id: string) => any,
};

const Notes = ({
  notes,
  onValueClick,
  onEdit,
  onDelete,
}: Props): Object => {
  return (
    <ul className="notes">{notes.map(note =>
      <Note
        className = "note"
        id        = {note.id}
        key       = {note.id}
        onMove    = {LaneActions.move}
      >
        <Editable
          editing      = {note.editing}
          value        = {note.task}
          onValueClick = {onValueClick.bind(null, note.id)}
          onEdit       = {onEdit.bind(null, note.id)}
          onDelete     = {onDelete.bind(null, note.id)}
        />
      </Note>
    )}</ul>
  );
};

export default Notes;
