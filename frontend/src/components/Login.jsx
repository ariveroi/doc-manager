import axios from "axios";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = {
      username: username,
      password: password,
    };
    axios
      .post("/login", data)
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
  };

  const handleLogout = () => {
    axios
      .post("/logout")
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
  };
  return (
    <>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Login;
