// @flow
import React           from 'react';
import AltContainer    from 'alt-container';
import Notes           from './Notes';
import NoteActions     from '../actions/NoteActions';
import NoteStore       from '../stores/NoteStore';
import type {NoteType} from '../types/types';

type State = {
  notes: Array<NoteType>
};

export default class App extends React.Component<void, {}, State> {
  state: State;

  render(): Object {
    return (
      <div>
        <button
          className = "add-note"
          onClick   = {this.addNote}
        >
          +
        </button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes,
          }}
        >
          <Notes
            onEdit   = {this.editNote}
            onDelete = {this.deleteNote}
          />
        </AltContainer>
      </div>
    );
  }

  storeChanged: (state: State) => void = (state) => {
    this.setState(state);
  };

  addNote: () => void = () => {
    NoteActions.create({task: 'New task'});
  };

  editNote: (id: string, task: string) => void = (id, task) => {
    if(!task.trim())  {
      return;
    }

    NoteActions.update({id, task});
  };

  deleteNote: (id: string, e: Object) => void = (id, e) => {
    e.stopPropagation();
    NoteActions.delete(id);
  };
}
