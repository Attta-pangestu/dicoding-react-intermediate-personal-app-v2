import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import LocaleContext from "../context/localeContext";
import { showFormattedDate } from "../utils/convertDateFormat";
function NoteItem({id,title, body, createdAt, archived}) {
    const {locale} = React.useContext(LocaleContext); 
    return (
        <article className="note-item">
            <Link to={`/notes/${id}`} > <h3>{title}</h3> </Link>
            <small className="note-item__createdAt">{locale === 'id' ? showFormattedDate(createdAt, "id-ID") : showFormattedDate(createdAt, "en-EN")  }</small>
            <p className="note-item__body">{body}</p>
        </article>
    );
}

NoteItem.propTypes = {
    id: PropTypes.string.isRequired, 
    title: PropTypes.string, 
    body: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
}

export default NoteItem;