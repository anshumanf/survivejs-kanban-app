// @flow
import {PropTypes} from 'react';

const KanbanPropTypes = {
  Note : PropTypes.shape({
    id   : PropTypes.string.isRequired,
    task : PropTypes.string.isRequired,
  }),
};

export default KanbanPropTypes;
