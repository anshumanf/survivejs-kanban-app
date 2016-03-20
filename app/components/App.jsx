// @flow
import uuid            from 'node-uuid';
import React           from 'react';
import Notes           from './Notes';
import type {NoteType} from '../types/types';

type State = {
  notes: Array<NoteType>
};

export default class App extends React.Component<void, {}, State> {
  state: State;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      notes : [{
        id   : uuid.v4(),
        task : 'Learn Webpack',
      }, {
        id   : uuid.v4(),
        task : 'Learn React',
      }, {
        id   : uuid.v4(),
        task : 'Do laundry',
      }],
    };
  }

  render(): Object {
    const notes = this.state.notes;

    return (
      <div>
        <button
          className = "add-note"
          onClick   = {this.addNote}
        >
          +
        </button>
        <Notes
          notes    = {notes}
          onEdit   = {this.editNote}
          onDelete = {this.deleteNote}
        />
      </div>
    );
  }

  addNote: () => void = () => {
    this.setState({
      notes: [...this.state.notes, {
        id   : uuid.v4(),
        task : 'New task',
      }],
    });
  };

  editNote: (id: string, task: string) => void = (id, task) => {
    if(!task.trim())  {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id)  {
        note.task = task;
      }
      return note;
    });

    this.setState({notes});
  };

  deleteNote: (id: string, e: Object) => void = (id, e) => {
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
    });
  };
}
