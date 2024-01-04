import React from "react";
import NoteItem from "./NoteItem";

function NoteList({noteListArray}){
    return (
        <div className="notes-list">
            {
                noteListArray.map(note => (<NoteItem key={note.id} {...note}/>))
            }
        </div>
    );
}

export default NoteList;