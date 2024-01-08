import React from "react";
import NoteItem from "./NoteItem";

function NoteList({noteListArray}){
    if(noteListArray.length) {
        return (
            <div className="notes-list">
                {
                    noteListArray.map(note => (<NoteItem key={note.id} {...note}/>))
                }
            </div>
        );
    }
    return (
        <div className="notes-list-empty">
            <p>Tidak ada catatan</p>
        </div>
    );

}

export default NoteList;