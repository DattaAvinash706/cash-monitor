

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NavBar({ toggleTheme, theme, user }) {
    return (
        <nav className="navbar">

            <div className="nav-left">
                <img src={logo} alt="logo" className="nav-logo" />

                <div className="nav-links">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/add" className="nav-link">Add Expense</Link>
                    <Link to="/expenses" className="nav-link">Expenses</Link>
                </div>
            </div>

            <div className="nav-right">
                {user && user.username ? (
                    <span className="nav-user">{user.username}</span>
                ) : null}

                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "light" ? "Dark" : "Light"}
                </button>
            </div>

        </nav>
    );
}
