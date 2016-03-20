// @flow
import uuid            from 'node-uuid';
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
  attachToLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
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
}

export default alt.createStore(LaneStore, 'LaneStore');
