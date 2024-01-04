import React from "react";

function SearchBar({onSearch, searchKeyword}) {
    return (
        <div className="search-bar">
            <input 
                type="search"
                placeholder="Cari berdasarkan judul..."
                onChange={(e) => onSearch(e.target.value) }
                // value={searchKeyword}
            />
        </div>
    )
}

export default SearchBar;