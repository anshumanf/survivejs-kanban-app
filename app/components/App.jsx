/* @flow */
import React             from 'react';
import AltContainer      from 'alt-container';
import {DragDropContext} from 'react-dnd';
import HTML5Backend      from 'react-dnd-html5-backend';
import Lanes             from './Lanes.jsx';
import LaneActions       from '../actions/LaneActions';
import LaneStore         from '../stores/LaneStore';


class App extends React.Component<void, {}, void> {
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

export default DragDropContext(HTML5Backend)(App);
