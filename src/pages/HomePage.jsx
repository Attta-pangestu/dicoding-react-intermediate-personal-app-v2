import React from "react";
import SearchBar from "../components/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";

// import data
import { getActiveNotes } from "../utils/local-data";
import { showFormattedDate } from "../utils/convertDateFormat";

// import style
import style from '../styles/homepage.module.css';

// import component
import NoteList from "../components/NoteList";
import ButtonActions from "../components/ButtonActions";

// import icons
import {FiPlusCircle} from 'react-icons/fi';

function HomePageWrapper() {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    const searchKeyword = urlSearchParams.get('note')
    
    function onSearchHandler(keyword){
        setUrlSearchParams({
            note : keyword,
        })  
    }
    
    const navigate = useNavigate();
    function onClickAddButton(){
        console.log("klik add");
        navigate('/notes/new');
        
    }

    return <HomePage 
        searchNoteKeyword={searchKeyword} 
        onSearch={onSearchHandler}
        onAdd={onClickAddButton}
        /> ;
}

class HomePage extends React.Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            noteListArray : getActiveNotes(),
            searchKeyword : props.searchNoteKeyword || '',
        }
        this.onChangeKeywordValue = this.onChangeKeywordValue.bind(this);
    }

    onChangeKeywordValue(keyword) {
        // sesuaikan dengan url
        this.props.onSearch(keyword);
        this.setState({
            searchKeyword : keyword,
        })
    }


    render() {
        const filteredNotesList = this.state.noteListArray.filter(note => {
            return (
            note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) 
            ||
            note.body.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
            );
        }
        );

        
        return(
            <section>
                <h2>Catatan Aktif</h2>
                <SearchBar onSearch={this.onChangeKeywordValue} searchKeyword={this.state.searchKeyword}/>
                <NoteList noteListArray={this.state.noteListArray}/> 
                <div className="homepage__action">
                    <ButtonActions tooltipe={"Tambah catatan"} onClick={this.props.onAdd} icon={<FiPlusCircle />}/>
                </div>
            </section>
        );
    }
}

export default HomePageWrapper;