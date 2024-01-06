import React from "react";
import {useParams} from 'react-router-dom';
import { getNote } from "../utils/local-data";


// import component
import ButtonActions from "../components/ButtonActions";
import {FiArchive} from "react-icons/fi" ; 

function DetailPageWrapper() {
    const {id} = useParams();
    return <DetailPage  noteId={id}/>;
    
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailNote : getNote(props.noteId)
        }
    }

    render() {
        const {id, title, body, createdAt, archived} = this.state.detailNote ; 
        return (
            <div className="detail-page">
                <h1 className="detail-page__title">{title}</h1>
                <small className="detail-page__createdAt">{createdAt}</small>
                <p className="detail-page__body">{body}</p>
                <div className="detail-page__action">
                    {/* <ButtonActions  icons={<FiArchive />} tooltipe={"Arsipkan"} /> */}
                </div>
            </div>
        );
        
    }
}

export default DetailPageWrapper;