import React from "react";
import {useParams} from 'react-router-dom';
import { getNote, archiveNote, deleteNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";

// import component
import ButtonActions from "../components/ButtonActions";
import {FiArchive, FiTrash2} from "react-icons/fi" ; 
import sweetAlert from "../components/SweetAlert";



function DetailPageWrapper() {
    const {id} = useParams();
    const navigate = useNavigate();


    function onArchiveHandler(){
        archiveNote(id);
        sweetAlert("Berhasil Mengarsipkan Catatan");
        navigate('/');  
    }
    
    function onDelete() {
        deleteNote(id) ; 
        console.log(getNote(id));
        sweetAlert("Berhasil Menghapus Catatan");
        navigate('/');
    }

    return <DetailPage  noteId={id} onArchive={onArchiveHandler} onDelete={onDelete}/>;

}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailNote : getNote(props.noteId),
        }        
    }
    render() {
        const {title, body, createdAt} = this.state.detailNote ; 
        return (
            <div className="detail-page">
                <h1 className="detail-page__title">{title}</h1>
                <small className="detail-page__createdAt">{createdAt}</small>
                <p className="detail-page__body">{body}</p>
                <div className="detail-page__action">
                    <ButtonActions  icon={<FiArchive />} tooltipe={"Arsipkan"} onClick={this.props.onArchive} /> 
                    <ButtonActions icon={<FiTrash2 />} tooltipe={"Delete Catatan Ini"} onClick={this.props.onDelete} /> 
                </div>
            </div>
        );
        
    }
}

export default DetailPageWrapper;