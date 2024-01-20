import React from "react";
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// Utlis
import { getDetailNote, deleteNote, archiveNote, unArchiveNote, } from "../utils/networkData";
import { showFormattedDate } from "../utils/convertDateFormat";

// context
import LocaleContext from "../context/localeContext";

// import component
import ButtonActions from "../components/ButtonActions";
import {FiArchive, FiTrash2, FiUpload, FiEdit} from "react-icons/fi" ; 
import sweetAlert from "../components/SweetAlert";


function DetailPageWrapper() {
    const {id} = useParams();
    const {locale} = React.useContext(LocaleContext);
    const navigate = useNavigate();
    
    // state 
    const [detailNote, setDetailNote] = React.useState([]); 
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        getDetailNote(id).then(({error, data}) => {
            setDetailNote(data);
            setIsLoading(false);
        })
    }, [])

    function onEditHandler() {
        navigate(`/notes/edit/${id}`);
    }

    async function onArchiveHandler(){
        await archiveNote(id);
        sweetAlert("Berhasil Mengarsipkan Catatan");
        navigate('/');  
    }

    async function onActiveHandler() {
        await unArchiveNote(id);
        sweetAlert("Berhasil Mengaktifkan Catatan");
        navigate('/');
    }
    
    async function onDelete() {
        await deleteNote(id) ; 
        sweetAlert("Berhasil Menghapus Catatan");
        navigate('/');
    }

    const {title, body, createdAt, archived} = detailNote ; 
    
    if(isLoading) {
        return(
            <div className="detail-page"></div>
        );
    }

    return (
        <div className="detail-page">
            <h1 className="detail-page__title">{title}</h1>
            <small className="detail-page__createdAt">{locale === 'id' ? showFormattedDate(createdAt, "id-ID") : showFormattedDate(createdAt, "en-EN")}</small>
            <p className="detail-page__body">{body}</p>
            <div className="detail-page__action">
                <ButtonActions icon={<FiEdit />} tooltipe={"Edit"} onClick={onEditHandler} />
                {archived ?
                <ButtonActions  icon={<FiUpload />} tooltipe={"Aktifkan"} onClick={onActiveHandler} /> 
                : 
                <ButtonActions  icon={<FiArchive />} tooltipe={"Arsipkan"} onClick={onArchiveHandler} />  
                }
                <ButtonActions icon={<FiTrash2 />} tooltipe={"Delete Catatan Ini"} onClick={onDelete} /> 
            </div>
        </div>
    );
    

}

export default DetailPageWrapper;