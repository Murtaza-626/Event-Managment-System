import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../authSlice";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData));
    if (localStorage.getItem("activeUser")) {
      navigate("/events");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label><br />
        <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} required /></label><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;