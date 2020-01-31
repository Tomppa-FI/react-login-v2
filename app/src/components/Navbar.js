import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    render() {
        let navItems = this.props.user ? 
        <>
        <p>Hello, {this.props.user.username}</p>
        <button onClick={() => {this.props.toggleChange(false)}}>Sign Out</button>
        </>
        : 
        <>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Log In</Link>
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