import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";

const Navbar = (props) => {
    const { libraryIsOpen, setLibraryIsOpen, setChecked, checked } = props;

    return (
        <nav>
            <h1>Waves</h1>
            <div className="buttons">
                <button onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
                    <span>library &ensp;</span>
                    <FontAwesomeIcon icon={faMusic} className='music' />
                </button>
                <Switch
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    uncheckedIcon={
                        <div className='moon'>
                            <FontAwesomeIcon icon={faMoon} />
                        </div>
                    }
                    checkedIcon={
                        <div className='sun'>
                            <FontAwesomeIcon icon={faSun} />
                        </div>
                    }
                    onColor="#f5deb3"
                    offColor="#0C2D48"
                    className="react-switch"
                />
            </div>

        </nav>
    );
};

export default Navbar;