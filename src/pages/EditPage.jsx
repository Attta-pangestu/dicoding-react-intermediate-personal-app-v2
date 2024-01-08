import React from "react";
import {FiCheckCircle} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// utlis
import { addNote, getNote} from "../utils/local-data";

// component
import NoteInput from "../components/NoteInput";
import ButtonActions from "../components/ButtonActions";
import sweetAlert from "../components/SweetAlert";


function EditPagesWrapper() {
    const {noteId}  = useParams();
    const navigate = useNavigate();
    const noteData = getNote(noteId);
    const initialBody = noteData.body;

    function onClickAddHandler(stateNote) {
        addNote({...stateNote});
        sweetAlert("Berhsil Menyimpan Catatan");
        navigate('/');
    }

    return <EditPages initialBody={initialBody} noteItem={noteData} onClickAdd={onClickAddHandler}/>
}


class EditPages extends React.Component {
    constructor(props) {  
        super(props);
        this.state = {
            title: props.noteItem.title,
            body: props.noteItem.body, 
            initialBody: props.initialBody,
        }
        this.onInputTitleChangeHandler = this.onInputTitleChangeHandler.bind(this);
        this.onInputBodyChangeHandler = this.onInputBodyChangeHandler.bind(this);
        this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    }
    
    onInputTitleChangeHandler(event) {
        this.setState({
            title : event.target.value
        })
        
    }

    onInputBodyChangeHandler(event) {
        this.setState({
            body: event.target.innerHTML

        })
    }

    onAddNotesHandler() {
        this.props.onClickAdd(this.state);
    }

    render() {
        return (
            <div className="add-new-page">    
                <div className="add-new-page__input">
                    <NoteInput 
                        state={this.state}
                        onTitleInputHandler={this.onInputTitleChangeHandler}
                        onBodyInputHandler={this.onInputBodyChangeHandler}
                        initialBody={this.state.initialBody}
                    />
                </div>
                <div className="add-new-page__action">
                    <ButtonActions icon={<FiCheckCircle/>} onClick={this.onAddNotesHandler} tooltipe={"simpan catatan"} />
                </div>

            </div>
        );
    }
}

export default EditPagesWrapper;