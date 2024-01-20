import React from "react";
import {FiCheckCircle} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// utlis
import { editNote, getNote} from "../utils/local-data";
import { getDetailNote } from "../utils/networkData";
// component
import NoteInput from "../components/NoteInput";
import ButtonActions from "../components/ButtonActions";
import sweetAlert from "../components/SweetAlert";


function EditPagesWrapper() {
    const {noteId}  = useParams();
    const navigate = useNavigate();

    const [noteData, setNoteData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const initialBody = noteData.body;

    React.useEffect(()=> {
        getDetailNote(noteId).then(({data}) => {
            setNoteData(data);
            setIsLoading(false);
        })
    }, [])
    function onClickEditHandler(stateNote) {
        editNote({...stateNote});
        sweetAlert("Berhsil Menyimpan Catatan");
        navigate('/');
    }
    if(isLoading) {
        return (<div className="add-new-page"></div>)
    }
    return <EditPages initialBody={initialBody} noteItem={noteData} onClickEdit={onClickEditHandler}/>
}


class EditPages extends React.Component {
    constructor(props) {  
        super(props);
        this.state = {
            id : props.noteItem.id,
            title: props.noteItem.title,
            body: props.noteItem.body, 
        }
        this.onInputTitleChangeHandler = this.onInputTitleChangeHandler.bind(this);
        this.onInputBodyChangeHandler = this.onInputBodyChangeHandler.bind(this);
        this.onEditNotesHandler = this.onEditNotesHandler.bind(this);
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

    onEditNotesHandler() {
        this.props.onClickEdit(this.state);
    }

    render() {
        return (
            <div className="add-new-page">    
                <div className="add-new-page__input">
                    <NoteInput 
                        state={this.state}
                        onTitleInputHandler={this.onInputTitleChangeHandler}
                        onBodyInputHandler={this.onInputBodyChangeHandler}
                        initialBody={this.props.initialBody}
                    />
                </div>
                <div className="add-new-page__action">
                    <ButtonActions icon={<FiCheckCircle/>} onClick={this.onEditNotesHandler} tooltipe={"simpan catatan"} />
                </div>

            </div>
        );
    }
}

export default EditPagesWrapper;