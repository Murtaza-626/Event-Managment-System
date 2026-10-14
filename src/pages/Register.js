import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../authSlice";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes using spread operator 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(formData));
    alert("Registration successful!");
    navigate("/events");
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required /></label><br />
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label><br />
        <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} required /></label><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;