import React from "react";
import {useParams} from 'react-router-dom';
import { getNote, archiveNote, deleteNote, unarchiveNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";

// import component
import ButtonActions from "../components/ButtonActions";
import {FiArchive, FiTrash2, FiUpload, FiEdit} from "react-icons/fi" ; 
import sweetAlert from "../components/SweetAlert";



function DetailPageWrapper() {
    const {id} = useParams();
    const navigate = useNavigate();

    function onEditHandler(id) {
        navigate(`/notes/edit/${id}`);
    }

    function onArchiveHandler(id){
        archiveNote(id);
        sweetAlert("Berhasil Mengarsipkan Catatan");
        navigate('/');  
    }

    function onActiveHandler(id) {
        unarchiveNote(id);
        sweetAlert("Berhasil Mengaktifkan Catatan");
        navigate('/');
    }
    
    function onDelete(id) {
        deleteNote(id) ; 
        console.log(getNote(id));
        sweetAlert("Berhasil Menghapus Catatan");
        navigate('/');
    }

    return <DetailPage onEdit={onEditHandler} onActive={onActiveHandler} noteId={id} onArchive={onArchiveHandler} onDelete={onDelete}/>;

}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailNote : getNote(props.noteId),
        }
        
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
        this.onClickArchiveButtonHandler = this.onClickArchiveButtonHandler.bind(this);
        this.onClickActiveButtonHandler = this.onClickActiveButtonHandler.bind(this);
        this.onClickEditButton = this.onClickEditButton.bind(this);
    }
    
    onClickEditButton() {
        this.props.onEdit(this.props.noteId);
    }

    onClickDeleteButton() {
        this.props.onDelete(this.props.noteId);
    }

    onClickArchiveButtonHandler() {
        this.props.onArchive(this.props.noteId);
    }

    onClickActiveButtonHandler(){
        this.props.onActive(this.props.noteId);
    }

    render() {
        const {title, body, createdAt, archived} = this.state.detailNote ; 
        return (
            <div className="detail-page">
                <h1 className="detail-page__title">{title}</h1>
                <small className="detail-page__createdAt">{createdAt}</small>
                <p className="detail-page__body">{body}</p>
                <div className="detail-page__action">
                    <ButtonActions icon={<FiEdit />} tooltipe={"Edit"} onClick={this.onClickEditButton} />
                    {archived ?
                    <ButtonActions  icon={<FiUpload />} tooltipe={"Aktifkan"} onClick={this.onClickActiveButtonHandler} /> 
                    : 
                    <ButtonActions  icon={<FiArchive />} tooltipe={"Arsipkan"} onClick={this.onClickArchiveButtonHandler} />  
                    }
                    <ButtonActions icon={<FiTrash2 />} tooltipe={"Delete Catatan Ini"} onClick={this.onClickDeleteButton} /> 
                </div>
            </div>
        );
        
    }
}

export default DetailPageWrapper;