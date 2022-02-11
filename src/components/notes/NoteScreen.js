import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const { form, handleInputChange, reset } = useForm(note);
  const activeId = useRef(note.id);

  const handleDelete = () => {
    dispatch(startDeleting(note.id));
  };

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(form.id, form));
  }, [form, dispatch]);

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Title"
          name="title"
          autoComplete="off"
          className="notes__title-input"
          value={form.title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened..."
          className="notes__textarea"
          name="body"
          value={form.body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="iimage" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
