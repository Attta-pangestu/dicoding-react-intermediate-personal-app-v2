import React from "react";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";

// import data
import { getAllNotes } from "../utils/local-data";

// import style
import style from '../styles/homepage.module.css';

// import component
import NoteList from "../components/NoteList";

function HomePageWrapper() {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();
    function onSearchHandler(keyword){
        setUrlSearchParams({
            note : keyword,
        })
    }
    return <HomePage onSearch={onSearchHandler}/> 
}

class HomePage extends React.Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            noteListArray : getAllNotes(),
        }
    }

    render() {
        return(
            <section>
                <h2>Catatan Aktif</h2>
                <SearchBar onSearch={this.props.onSearch}/>
                <NoteList noteListArray={this.state.noteListArray}/> 
            </section>
        );
    }
}

export default HomePageWrapper;