import React from "react";

function SearchBar({onSearch}) {
    return (
        <div className="search-bar">
            <input 
                type="search"
                placeholder="Cari berdasarkan judul..."
                onChange={(e) => onSearch(e.target.value) }
                
            />
        </div>
    )
}

export default SearchBar;