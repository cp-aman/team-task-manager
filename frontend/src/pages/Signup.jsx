import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/signup", formData);

      alert("Signup successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <br /><br />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
};

export default Signup;