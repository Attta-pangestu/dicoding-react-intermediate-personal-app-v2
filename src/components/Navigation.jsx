import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return( 
        <React.Fragment >
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
            
            <nav className="navigation">
                <ul>
                    <li><Link to="/arsip">Arsip</Link></li>
                    <li><Link to="/deleted">Trash</Link></li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navigation;