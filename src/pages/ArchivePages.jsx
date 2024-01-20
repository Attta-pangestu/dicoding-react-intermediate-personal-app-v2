import React from "react";
import { useSearchParams } from "react-router-dom";

// import Component
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";

// import utlis
import { getArchiveNOte } from "../utils/networkData";

function ArchivePagesWrapper () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [archivedNotes, setArchivedNotes] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getArchiveNOte().then(({data}) => {
            setArchivedNotes(data); 
            setLoading(false); 
        })
    })
    function onSearchBarChangeHandler(keyword){
        setSearchParams({
            note : keyword,
        })
    }
    const searchKeyword = searchParams.get('note');
    
    if(isLoading) {
        return(<div className="archived-page"></div>)
    }
    return <ArchivePages archiveNotes={archivedNotes} searchKeyword={searchKeyword} onSearch={onSearchBarChangeHandler}/>
}

class ArchivePages extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            archiveNotes : props.archiveNotes,
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