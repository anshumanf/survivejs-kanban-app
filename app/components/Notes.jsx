// @flow
import React           from 'react';
import Note            from './Note';
import type {NoteType} from '../types/types';

type Props = {
  notes    : Array<NoteType>,
  onEdit   : Function,
  onDelete : Function,
};

const Notes = ({
  notes,
  onEdit,
  onDelete,
}: Props): Object => {
  return (
    <ul>{notes.map(note =>
      <li
        className = "note"
        key       = {note.id}
      >
        <Note
          task     = {note.task}
          onEdit   = {onEdit.bind(null, note.id)}
          onDelete = {onDelete.bind(null, note.id)}
        />
      </li>
    )}</ul>
  );
};

export default Notes;
