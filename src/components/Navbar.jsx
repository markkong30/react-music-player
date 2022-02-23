import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {
    const { libraryIsOpen, setLibraryIsOpen } = props;

    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
                <span>library &ensp;</span>
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
};

export default Navbar;