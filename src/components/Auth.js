import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store/index";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://rock-space-bog.herokuapp.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (IsSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authAction.login()))
        .then(() => navigate("./blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authAction.login()))
        .then(() => navigate("./blogs"))
        .then((data) => console.log(data));
    }
  };

  const [IsSignup, setIsSignup] = useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
        >
          {!IsSignup && <Typography> Login </Typography>}
          {IsSignup && <Typography> Signup </Typography>}
          {IsSignup && (
            <TextField
              name="name"
              onChange={handlechange}
              value={inputs.name}
              placeholder="Name"
            />
          )}
          <TextField
            name="email"
            onChange={handlechange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
          />
          <TextField
            name="password"
            onChange={handlechange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
          />
          <Button type="submit">Submit</Button>
          <Button onClick={() => setIsSignup(!IsSignup)}>
            Change to {IsSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
