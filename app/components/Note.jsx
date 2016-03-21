/* @flow */
import React        from 'react';
import {
  DragSource,
  DropTarget,
} from 'react-dnd';
import ItemTypes    from '../constants/itemTypes';

type Props = {
  children: any,
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

@DragSource(
  ItemTypes.NOTE,
  noteSource,
  (connect, monitor) => ({
    connectDragSource : connect.dragSource(),
    isDragging        : monitor.isDragging(),
  })
)
@DropTarget(
  ItemTypes.NOTE,
  noteTarget,
  (connect) => ({
    connectDropTarget : connect.dropTarget(),
  })
)
export default class Note extends React.Component<void, Props, void> {
  props: Props;
  render() {
    /* eslint-disable no-unused-vars */
    /* eslint-disable react/prop-types */
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      id,
      onMove,
      ...props,
    } = this.props;
    /* eslint-enable react/prop-types */
    /* eslint-enable no-unused-vars */
    return connectDragSource(connectDropTarget(
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
