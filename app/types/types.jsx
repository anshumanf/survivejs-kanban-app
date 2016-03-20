// @flow

export type NoteType = {
  id   : string,
  task : string,
};

export type LaneType = {
  id    : string,
  name  : string,
  notes : Array<string>,
};
