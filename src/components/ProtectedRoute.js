import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Enforcing apropriate route structure
function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Redirect Programmatically

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to view this page.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Only render the protected component if the user exists
  return user ? children : null;
}

export default ProtectedRoute;