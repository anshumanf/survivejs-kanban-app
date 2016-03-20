// @flow
import React from 'react';

type Props = {
  task     : string,
  onEdit   : Function,
  onDelete : Function,
};

type State = {
  editing : boolean,
};

class Note extends React.Component<void, Props, State> {
  state: State;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      editing: false,
    };
  }

  render(): Object  {
    let retJsX = null;

    if(this.state.editing)  {
      retJsX = this.renderEdit();
    } else {
      retJsX = this.renderNote();
    }

    return retJsX;
  }

  renderEdit: () => React.Element = () => {
    return (
      <input
        ref          = {
          (e) => e ? e.selectionStart = this.props.task.length : null
        }
        autoFocus    = {true}
        defaultValue = {this.props.task}
        onBlur       = {this.finishEdit}
        onKeyPress   = {this.checkEnter}
      />
    );
  };

  renderNote: () => React.Element = () => {
    const onDelete = this.props.onDelete;
    return (
      <div
        onClick = {this.edit}
      >
        <span className="task">{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  renderDelete: () => React.Element = () => {
    return (
      <button
        className = "delete-note"
        onClick   = {this.props.onDelete}
      >
        X
      </button>
    );
  };

  finishEdit: (e: Object) => void = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);

      this.setState({
        editing: false,
      });
    }
  };

  checkEnter: (e: Object) => void = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  edit: () => void = () => {
    this.setState({
      editing: true,
    });
  };
}

export default Note;
