import React from "react";

import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleActive = () => {
    const note = {
      title,
      body,
      date,
      url,
    };
    dispatch(activeNote(id, note));
  };

  return (
    <div
      className="journal__entry animate__animated animate__fadeIn"
      onClick={handleActive}
    >
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};