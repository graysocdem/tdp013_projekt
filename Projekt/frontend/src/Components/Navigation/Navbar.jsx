import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#home">Hem</a></li>
                <li><a href="#about">Om oss</a></li>
                <li><a href="#contact">Kontakt</a></li>
                {/* Lägg till fler navigeringslänkar här */}
            </ul>
        </nav>
    );
}

export default Navbar;