import React from "react";
import SearchBar from "../components/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";

// import data
import { getActiveNotes } from "../utils/local-data";
import { getActiveNote } from "../utils/networkData";
// context
import LocaleContext from "../context/localeContext";

// import component
import NoteList from "../components/NoteList";
import ButtonActions from "../components/ButtonActions";

// import icons
import {FiPlusCircle} from 'react-icons/fi';

function HomePageWrapper() {
    const {locale} = React.useContext(LocaleContext);
    const navigate = useNavigate();
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const keywordParams = urlSearchParams.get('note') || '';
    // state 
    const [noteListArray , setNoteListArray] = React.useState([]) ; 
    const [searchKeyword, setSearchKeyword] = React.useState(keywordParams);

    React.useEffect(() => {
        getActiveNote().then(({error, data, message}) => {
            setNoteListArray(data);
        })
    }, [])

    // handler function 
    const onChangeKeywordValue = (keyword) => {
        setUrlSearchParams({note : keyword})  ;
        setSearchKeyword(keyword);  
    }

    const onClickAddButton = () => {
        navigate('/notes/new');
    }

    const filteredNotesList = noteListArray.filter(note => {
        return (
        note.title.toLowerCase().includes(searchKeyword.toLowerCase()) 
        );
    });
    
    return (
        <section>
            <h2>{locale === 'id' ? 'Catatan Aktif' : "Active Notes"}</h2>
            <SearchBar onSearch={onChangeKeywordValue} searchKeyword={searchKeyword}/>
            <NoteList noteListArray={noteListArray}/> 
            <div className="homepage__action">
                <ButtonActions tooltipe={"Tambah catatan"} onClick={onClickAddButton} icon={<FiPlusCircle />}/>
            </div>
        </section>
    );
}

export default HomePageWrapper;


