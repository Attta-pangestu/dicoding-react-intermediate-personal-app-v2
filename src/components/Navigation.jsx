import React from "react";
import { Link } from "react-router-dom";
import {FiSun, FiMoon} from 'react-icons/fi';
import { SiGoogletranslate } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
// Components
import ButtonActions from "./ButtonActions";

// Context 
import ThemeContext from "../context/themeContext";
import LocaleContext from "../context/localeContext";

function Navigation({ authedStatus, onLogoutHandler, name }) {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const { locale, toggleLocale } = React.useContext(LocaleContext);

    return (
        <React.Fragment>
            <h1><Link to="/">{locale === 'id' ? "Aplikasi Catatan" : "Notes App"}</Link></h1>
            <nav className="navigation">
                <ul>
                    {authedStatus && <li><Link to="/arsip">{locale === 'id' ? "Arsip" : "Archive"}</Link></li>}
                    <li>
                        <ButtonActions icon={theme === 'light' ? <FiSun /> : <FiMoon />} tooltipe={locale === 'id' ? "Ubah Mode" : "Change Mode"} onClick={toggleTheme} />
                    </li>
                    <li> <ButtonActions icon={<SiGoogletranslate />} tooltipe={locale === 'id' ? "Ubah Bahasa" : "Change Language"} onClick={toggleLocale} /></li>
                    {authedStatus && <li> <ButtonActions icon={<FiLogOut />} onClick={onLogoutHandler} tooltipe={locale === 'id' ? "Keluar" : "Logout"} /> {name} </li>}
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navigation;