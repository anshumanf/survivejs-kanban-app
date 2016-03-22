/* @flow */
import uuid            from 'node-uuid';
import update          from 'react-addons-update';
import alt             from '../libs/alt';
import LaneActions     from '../actions/LaneActions';
import type {LaneType} from '../types/types';

class LaneStore {
  lanes                 : Array<LaneType>;
  bindActions()         : void {}
  exportPublicMethods() : void {}
  setState()            : void {}

  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];
    this.setState({
      lanes: [...lanes, lane],
    });
  }

  update(updatedLane) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === updatedLane.id) {
        return Object.assign({}, lane, updatedLane);
      }
      return lane;
    });
    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id),
    });
  }

  attachToLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if(lane.notes.includes(noteId)) {
        lane.notes = lane.notes.filter(id => id !== noteId);
      }

      if(lane.id === laneId) {
        if(lane.notes.includes(noteId)) {
          /* eslint-disable no-console */
          console.warn('Already attached note to lane', lanes);
          /* eslint-enable no-console */
        } else {
          lane.notes.push(noteId);
        }
      }
      return lane;
    });
    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note !== noteId);
      }
      return lane;
    });
    this.setState({lanes});
  }

  move({sourceId, targetId})  {
    const
      lanes           = this.lanes,
      sourceLane      = lanes.filter(lane => lane.notes.includes(sourceId))[0],
      targetLane      = lanes.filter(lane => lane.notes.includes(targetId))[0],
      sourceNoteIndex = sourceLane.notes.indexOf(sourceId),
      targetNoteIndex = sourceLane.notes.indexOf(targetId);

    if(sourceLane === targetLane) {
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId],
        ],
      });
    } else {
      sourceLane.notes.splice(sourceNoteIndex, 1);
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }

    this.setState({lanes});
  }
}

export default alt.createStore(LaneStore, 'LaneStore');
