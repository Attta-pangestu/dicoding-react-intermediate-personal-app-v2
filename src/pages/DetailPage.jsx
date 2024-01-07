import React from "react";
import {useParams} from 'react-router-dom';
import { getNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";

// import component
import ButtonActions from "../components/ButtonActions";
import {FiArchive} from "react-icons/fi" ; 
import sweetAlert from "../components/SweetAlert";
// import utlis
import { archiveNote } from "../utils/local-data";


function DetailPageWrapper() {
    const {id} = useParams();
    const navigate = useNavigate();


    function onArchiveHandler(){
        archiveNote(id);
        sweetAlert("Berhsil Mengarsipkan Catatan");
        // navigate('/');
    }

    return <DetailPage  noteId={id} onArchive={onArchiveHandler}/>;

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
                </div>
            </div>
        );
        
    }
}

export default DetailPageWrapper;