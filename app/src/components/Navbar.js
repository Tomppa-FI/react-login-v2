import React from "react";
import {Link} from "react-router-dom";
import "../css/Navbar.css";

class Navbar extends React.Component {

    render() {
        let navItems = this.props.user ? 
        <>
        <p className="Navbar-item">Hello, {this.props.user.username}</p>
        <span className="Navbar-btn" onClick={() => {this.props.toggleChange(false)}}>Sign Out</span>
        </>
        : 
        <>
        <Link className="Navbar-item" to="/register">Sign Up</Link>
        <Link className="Navbar-item" to="/login">Log In</Link>
        </>;
        return (
            <div className="Navbar-container">
                <nav className="Navbar">
                    {navItems}
                </nav>
            </div>
        )
    }
}

export default Navbar;