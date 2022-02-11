/*
const notes = {
    notes: [],
    active: null
    active: {
        id: 'asd12e1d12',
        title: '',
        body: '',
        imgUrl: '',
        date: 1231240919
    }
}
*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: action.payload,
      };

    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) => {
          return note.id === action.payload.id ? action.payload.note : note;
        }),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        notes: [],
        active: null,
      };

    case types.notesNewNote:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };

    default:
      return state;
  }
};
