/* @flow */

export type NoteType = {
  id      : string,
  editing : boolean | void,
  task    : string,
};

export type LaneType = {
  id      : string,
  editing : boolean | void,
  name    : string,
  notes   : Array<string>,
};
