// @flow
import React, {PropTypes} from 'react';

const propTypes = {
  task     : PropTypes.string.isRequired,
  onEdit   : PropTypes.func.isRequired,
  onDelete : PropTypes.func.isRequired,
};

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  render()  {
    let retJsX = null;

    if(this.state.editing)  {
      retJsX = this.renderEdit();
    } else {
      retJsX = this.renderNote();
    }

    return retJsX;
  }

  renderEdit = () => {
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

  renderNote = () => {
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

  renderDelete = () => {
    return (
      <button
        className = "delete-note"
        onClick   = {this.props.onDelete}
      >
        X
      </button>
    );
  };

  finishEdit = (e) => {
    const value = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(value);

      this.setState({
        editing: false,
      });
    }
  };

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  edit = () => {
    this.setState({
      editing: true,
    });
  };
}

Note.propTypes = propTypes;

export default Note;
