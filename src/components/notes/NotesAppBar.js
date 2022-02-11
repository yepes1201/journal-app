import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const { active } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const date = moment(active.date).format("MMMM Do YYYY");

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handleUpload = () => {
    document.querySelector("#inputFile").click();
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>{date}</span>

      <input
        id="inputFile"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleInputFile}
      />

      <div>
        <button className="btn" onClick={handleUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
