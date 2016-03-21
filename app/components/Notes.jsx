// @flow
import React           from 'react';
import Editable        from './Editable';
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
      <li
        className = "note"
        key       = {note.id}
      >
        <Editable
          editing      = {note.editing}
          value        = {note.task}
          onValueClick = {onValueClick.bind(null, note.id)}
          onEdit       = {onEdit.bind(null, note.id)}
          onDelete     = {onDelete.bind(null, note.id)}
        />
      </li>
    )}</ul>
  );
};

export default Notes;
