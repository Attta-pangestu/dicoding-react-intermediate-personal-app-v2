import React from "react";
import SearchBar from "../components/SearchBar";

// import data
import { getAllNotes } from "../utils/local-data";

// import style
import style from '../styles/homepage.module.css';

// import component
import NoteList from "../components/NoteList";

class HomePage extends React.Component {
    constructor() {
        super() ; 
        this.state = {
            noteListArray : getAllNotes(),
        }
    }

    render() {
        return(
            <section>
                <h2>Catatan Aktif</h2>
                <SearchBar />
                <NoteList noteListArray={this.state.noteListArray}/> 
            </section>
        );
    }
}

export default HomePage;