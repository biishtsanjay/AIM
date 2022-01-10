import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const history = useHistory();

  const [user, setUser] = useState({
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
  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };
  return (
    <div>
      {console.log(user)}
      <h1 className="loginpage">Login Page</h1>
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
      <div className="button" onClick={login}>
        Login
      </div>
      <br></br>
      <h3>not registered yet ?</h3>
      <a  onClick={() => history.push("/register")}>
        Register here
      </a>
    </div>
  );
};

export default Login;
