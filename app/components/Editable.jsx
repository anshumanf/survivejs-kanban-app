// @flow
import selectn from 'selectn';
import React   from 'react';

type Props = {
  value         : string,
  onValueClick? : (() => any) | void,
  onEdit?       : ((v: string) => any) | void,
  onDelete?     : (() => any) | void,
  editing       : boolean | void,
};

class Editable extends React.Component<void, Props, void> {
  props: Props;

  render(): Object  {
    /* eslint-disable no-unused-vars */
    const {
      value,
      onEdit,
      onValueClick,
      editing,
      ...props,
    } = this.props;
    /* eslint-enable no-unused-vars */

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit: () => React.Element = () => {
    return (
      <input
        ref          = {
          (e) => e ? e.selectionStart = this.props.value.length : null
        }
        autoFocus    = {true}
        defaultValue = {this.props.value}
        onBlur       = {this.finishEdit}
        onKeyPress   = {this.checkEnter}
      />
    );
  };

  renderValue: () => React.Element = () => {
    const onDelete = this.props.onDelete;
    return (
      <div
        onClick = {this.props.onValueClick}
      >
        <span className="task">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  renderDelete: () => React.Element = () => {
    return (
      <button
        className = "delete"
        onClick   = {this.props.onDelete}
      >
        X
      </button>
    );
  };

  checkEnter: (e: KeyboardEvent) => void = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit: (e: MouseEvent | KeyboardEvent) => void = (e) => {
    const value = selectn('value', e.target);

    if(this.props.onEdit) {
      this.props.onEdit(value);
    }
  };
}

export default Editable;
