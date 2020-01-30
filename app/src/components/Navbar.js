import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div className="Navbar-container">
            <nav className="Navbar">
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </nav>
        </div>
    )
}

export default Navbar;