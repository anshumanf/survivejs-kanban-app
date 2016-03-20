// @flow
import React from 'react';
import Lane from './Lane';
import type {LaneType} from '../types/types';

type Props = {
  lanes : Array<LaneType>,
};

const Lanes = ({lanes}: Props): Object => {
  return (
    <div className="lanes">
      {lanes.map(
        lane => (
          <Lane
            className = "lane"
            key       = {lane.id}
            lane      = {lane}
          />
        )
      )}
    </div>
  );
};

export default Lanes;
