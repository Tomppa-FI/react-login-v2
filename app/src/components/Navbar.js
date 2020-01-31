import React from "react";
import {Link} from "react-router-dom";
import "../css/Navbar.css";

class Navbar extends React.Component {

    render() {
        let navItems = this.props.user ? 
        <>
        <p className="Navbar-item">Hello, {this.props.user.username}</p>
        <button className="Navbar-item" onClick={() => {this.props.toggleChange(false)}}>Sign Out</button>
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