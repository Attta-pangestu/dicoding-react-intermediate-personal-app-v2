import React from "react";
import PropTypes from 'prop-types';

function SearchBar({onSearch, searchKeyword}) {
    return (
        <div className="search-bar">
            <input  
                type="search"
                placeholder="Cari berdasarkan judul..."
                onChange={(e) => onSearch(e.target.value) }
                value={searchKeyword}    
            />
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchKeyword: PropTypes.string.isRequired,
}

export default SearchBar;