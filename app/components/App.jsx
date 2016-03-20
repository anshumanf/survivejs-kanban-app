// @flow
import React           from 'react';
import AltContainer    from 'alt-container';
import Lanes           from './Lanes.jsx';
import LaneActions     from '../actions/LaneActions';
import LaneStore       from '../stores/LaneStore';

export default class App extends React.Component<void, {}, void> {
  render(): Object {
    return (
      <div>
        <button
          className = "add-lane"
          onClick   = {this.addLane}
        >
          +
        </button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes,
          }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }

  addLane: () => void = () => {
    LaneActions.create({name: 'New lane'});
  };
}
