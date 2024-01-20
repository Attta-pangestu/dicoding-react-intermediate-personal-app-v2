import React from "react";
import {FiCheckCircle} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// utlis
import { addNote } from "../utils/local-data";
import { addNoteAPI } from "../utils/networkData";
// custom hooks
import { useTitleInput, useBodyInput} from "../hooks/customHooks";

// component
import NoteInput from "../components/NoteInput";
import ButtonActions from "../components/ButtonActions";
import sweetAlert from "../components/SweetAlert";


function AddPagesWrapper() {
    const navigate = useNavigate();
    // state
    const [title, setTitle] = useTitleInput() ; 
    const [body, setBody] = useBodyInput();

    const onClickAddHandler = async () => {
        console.log({title, body});
        await addNoteAPI({title, body});
        sweetAlert("Berhsil Menyimpan Catatan");
        navigate('/');
    }

    return (
        <div className="add-new-page">    
                <div className="add-new-page__input">
                    <NoteInput 
                        state={{title, body}}
                        onTitleInputHandler={setTitle}
                        onBodyInputHandler={setBody}
                    />
                </div>
                <div className="add-new-page__action">
                    <ButtonActions icon={<FiCheckCircle/>} onClick={onClickAddHandler} tooltipe={"simpan catatan"} />
                </div>

            </div>
    );
}



export default AddPagesWrapper;