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
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authAction.login()))
        .then(() => navigate("../"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authAction.login()))
        .then(() => navigate("../"))
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
          border="2px solid #ccc"
          mt="20px"
          ml="20px"
          mr="20px"
        >
          {!IsSignup && <Typography variant="h3" sx={{color:"#445e6f"}}> Login </Typography>}
          {IsSignup && <Typography  variant="h3" sx={{color:"#445e6f"}}> Signup </Typography>}
          {IsSignup && (
            <TextField
              name="name"
              onChange={handlechange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              required
            />
          )}
          <TextField
            name="email"
            onChange={handlechange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handlechange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            required
          />
          <Button 
          type="submit"
          sx={{background:"#445e6f",color:"#ffffff",marginTop:"10px"}}
          >Submit</Button>
          <Button sx={{border:"2px solid #445e6f",color:"#445e6f",marginTop:"15px",marginBottom:"20px"}} onClick={() => setIsSignup(!IsSignup)}>
            Change to {IsSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
