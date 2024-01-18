import React from "react";
import { Link } from "react-router-dom";
import {FiSun, FiMoon} from 'react-icons/fi';

// Components
import ButtonActions from "./ButtonActions";

// Context 
import ThemeContext from "../context/themeContext";


function Navigation({onClickToogleTheme}) {
    const {theme} = React.useContext(ThemeContext);
    console.log(theme);

    return( 
        <React.Fragment >
            <h1><Link to="/">Aplikasi Catatan</Link></h1>
            
            <nav className="navigation">
                <ul>
                    <li><Link to="/arsip">Arsip</Link></li>
                    <li>
                        <div className='toogle-theme'>
                            <ButtonActions icon={theme === 'light'? <FiSun /> : <FiMoon /> } tooltipe={"ganti tema"} onClick={onClickToogleTheme}/>
                        </div>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navigation;