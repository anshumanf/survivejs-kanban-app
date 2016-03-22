/* @flow */
import React        from 'react';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import ItemTypes    from '../constants/itemTypes';

type Props = {
  connectDragSource : () => any,
  connectDropTarget : () => any,
  isDragging        : boolean,
  id                : string,
  editing           : boolean | void,
  onMove            : () => any,
  children          : any,
};

const noteSource = {
  beginDrag(props)  {
    return {
      id: props.id,
    };
  },
  isDragging(props, monitor)  {
    return props.id === monitor.getItem().id;
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const
      targetId    = targetProps.id,
      sourceProps = monitor.getItem(),
      sourceId    = sourceProps.id;

    if(sourceId !== targetId)  {
      targetProps.onMove({sourceId, targetId});
    }
  },
};

class Note extends React.Component<void, Props, void> {
  props: Props;
  render() {
    /* eslint-disable no-unused-vars */
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      editing,
      id,
      onMove,
      ...props,
    } = this.props;
    /* eslint-enable no-unused-vars */
    const dragSource = editing ? x => x : connectDragSource;
    return dragSource(connectDropTarget(
      <li
        {...props}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
      >
        {props.children}
      </li>
    ));
  }
}

export default DragSource(
  ItemTypes.NOTE,
  noteSource,
  (connect, monitor) => ({
    connectDragSource : connect.dragSource(),
    isDragging        : monitor.isDragging(),
  })
)(
  DropTarget(
    ItemTypes.NOTE,
    noteTarget,
    (connect) => ({
      connectDropTarget : connect.dropTarget(),
    })
  )(Note)
);
