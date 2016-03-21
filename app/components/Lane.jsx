/* @flow */
import AltContainer    from 'alt-container';
import React           from 'react';
import Editable        from './Editable';
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
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable
            className = "lane-name"
            editing   = {lane.editing}
            value     = {lane.name}
            onEdit    = {this.editName}
          />
          <div className="lane-delete">
            <button onClick={this.deleteLane}>
              X
            </button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes),
          }}
        >
          <Notes
            onValueClick = {this.activateNoteEdit}
            onEdit       = {this.editNote}
            onDelete     = {this.deleteNote}
          />
        </AltContainer>
      </div>
    );
  }

  addNote: (e: Event) => void = (e) => {
    e.stopPropagation();
    const
      laneId = this.props.lane.id,
      note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId,
    });
  };

  activateNoteEdit: (id: string) => void = (id) => {
    NoteActions.update({id, editing: true});
  };

  editNote: (id: string, task: string) => void = (id, task) => {
    if(!task.trim()) {
      NoteActions.update({id, editing: false});
      return;
    }
    NoteActions.update({id, task, editing: false});
  };

  deleteNote: (noteId: string, e: Event) => void = (noteId, e) => {
    e.stopPropagation();
    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({
      laneId,
      noteId,
    });

    NoteActions.delete(noteId);
  };

  editName: (name: string) => void = (name) => {
    const laneId = this.props.lane.id;
    if(!name.trim())  {
      LaneActions.update({id: laneId, editing: false});
      return;
    }
    LaneActions.update({id: laneId, name, editing: false});
  };

  deleteLane: () => void = () => {
    const laneId = this.props.lane.id;
    LaneActions.delete(laneId);
  };

  activateLaneEdit: () => void = () => {
    const id = this.props.lane.id;
    LaneActions.update({id, editing: true});
  };
}
