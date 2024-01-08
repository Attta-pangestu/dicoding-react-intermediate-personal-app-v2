import React from "react";
import parser from 'html-react-parser';

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

export default NoteInput;