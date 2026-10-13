import {Link} from "react-router-dom"

function Navbar(){
    return(
        <nav style={{padding: "15px", background: "Lightblue", marginBottom: "20px"}}>
            <Link to="/">Home</Link>
            <Link to="/events">Explore Events</Link>
            <Link to="/my-events">My Events</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>

    )
}

export default Navbar;