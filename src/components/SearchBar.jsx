import React from "react";
import PropTypes from 'prop-types';
import LocaleContext from "../context/localeContext";

function SearchBar({onSearch, searchKeyword}) {
    const {locale} = React.useContext(LocaleContext);

    return (
        <div className="search-bar">
            <input  
                type="search"
                placeholder={locale === 'id' ?  "Cari berdasarkan judul..." : "search by name"}
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