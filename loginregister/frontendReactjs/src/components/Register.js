import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      axios.post("http://localhost:9002/register", user).then((response) => {
        alert(response.data.message);
        history.push("/login");
      });
    } else {
      alert("Invalid input");
    }
  };
  return (
    <div>
      {console.log(user)}
      <h1 className="homepage">Register Page</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter your name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Enter your email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter your password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <br></br>
      <h3>already registered ?</h3>
      <a onClick={() => history.push("/login")}>
        Login here
      </a>
    </div>
  );
};

export default Register;
