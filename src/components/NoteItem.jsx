import React from "react";

function NoteItem({title, body, createdAt, archived}) {
    return (
        <article className="note-item">
            <h3>{title}</h3>
            <small className="note-item__createdAt">{createdAt}</small>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

export default NoteItem;