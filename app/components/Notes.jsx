// @flow
import React, {PropTypes} from 'react';
import KanbanPropTypes    from '../propTypes/Kanban';
import Note               from './Note';

const propTypes = {
  notes    : PropTypes.arrayOf(KanbanPropTypes.Note).isRequired,
  onEdit   : PropTypes.func.isRequired,
  onDelete : PropTypes.func.isRequired,
};

const Notes = ({
  notes,
  onEdit,
  onDelete,
}) => {
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

Notes.propTypes = propTypes;

export default Notes;
