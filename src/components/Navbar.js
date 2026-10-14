import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav style={{ padding: "10px", background: "lightblue", marginBottom: "20px" }}>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/my-events">My Events</Link>
      {user ? (
        <span style={{ float: "right" }}>
          Hello, {user.name} <button onClick={handleLogout}>Logout</button>
        </span>
      ) : (
        <span style={{ float: "right" }}>
          <Link to="/login">Login</Link> 
          <Link to="/register">Register</Link>
        </span>
      )}
    </nav>
  );
}

export default Navbar;