// @flow
import AltContainer    from 'alt-container';
import React           from 'react';
import Notes           from './Notes';
import NoteActions     from '../actions/NoteActions';
import LaneActions     from '../actions/LaneActions';
import NoteStore       from '../stores/NoteStore';
import type {LaneType} from '../types/types';

type Props = {
  lane: LaneType,
};

export default class Lane extends React.Component<void, Props, void> {
  props: Props;
  render() {
    const {lane, ...props} = this.props;
    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes),
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote: () => void = () => {
    const
      laneId = this.props.lane.id,
      note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId,
    });
  };

  editNote: (id: string, task: string) => void = (id, task) => {
    if(!task.trim()) {
      return;
    }
    NoteActions.update({id, task});
  };

  deleteNote: (noteId: string, e: Object) => void = (noteId, e) => {
    e.stopPropagation();
    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({
      laneId,
      noteId,
    });

    NoteActions.delete(noteId);
  };
}
