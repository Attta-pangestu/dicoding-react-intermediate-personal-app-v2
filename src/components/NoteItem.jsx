import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NoteItem({id,title, body, createdAt, archived}) {
    return (
        <article className="note-item">
            <Link to={`/notes/${id}`} > <h3>{title}</h3> </Link>
            <small className="note-item__createdAt">{createdAt}</small>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
}

export default NoteItem;