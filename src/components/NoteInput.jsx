import React from "react";
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

function NoteInput({state, onTitleInputHandler, onBodyInputHandler, initialBody }) {
    
    return(
        <div className="add-new-page__input" >
            <input
                className="add-new-page__input__title"
                placeholder="Apa judul catatan ini...?"
                spellCheck='false'
                value={state.title}
                onChange={onTitleInputHandler}
            />

            <div 
                className="add-new-page__input__body"
                contentEditable='true'
                data-placeholder-body="Berikan deskripsi catatan ini..."
                spellCheck='false'
                onInput={onBodyInputHandler}
                suppressContentEditableWarning={true}
                >  
                {initialBody && parser(initialBody)}
            </div>

        </div>
        

    );
}


NoteInput.propTypes = {
    state: PropTypes.object.isRequired,
    onTitleInputHandler: PropTypes.func.isRequired,
    onBodyInputHandler: PropTypes.func.isRequired,
    initialBody: PropTypes.string
}

export default NoteInput;