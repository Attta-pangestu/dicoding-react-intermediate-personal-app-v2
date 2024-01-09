import React from "react";
import { useSearchParams } from "react-router-dom";

// import Component
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

// import utlis
import { getArchivedNotes } from "../utils/local-data";


function ArchivePagesWrapper () {
    const [searchParams, setSearchParams] = useSearchParams();
    
    function onSearchBarChangeHandler(keyword){
        setSearchParams({
            note : keyword,
        })
    }
    const searchKeyword = searchParams.get('note');
    

    return <ArchivePages searchKeyword={searchKeyword} onSearch={onSearchBarChangeHandler}/>
}

class ArchivePages extends React.Component {
    constructor() {
        super(); 
        this.state = {
            archiveNotes : getArchivedNotes(),
            searchKeyword :  '', 
        }
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onSearchHandler(keyword){
        this.props.onSearch(keyword);
        this.setState({
            searchKeyword : keyword
        })
    }

    render() {
        const filteredNotesList = this.state.archiveNotes.filter(note => {
            return (
            note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) 
            );
        }
        );
        const archivedNotes = getArchivedNotes();
        return (
            <section>
                <h2>Catatan Diarsipkan</h2>
                <SearchBar searchKeyword={this.state.searchKeyword} onSearch={this.onSearchHandler}  />
                <NoteList noteListArray={filteredNotesList}/>
            </section>
        );
    }
}

export default ArchivePagesWrapper ; 