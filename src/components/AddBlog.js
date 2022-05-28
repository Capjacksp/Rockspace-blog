import React,{useState} from 'react'
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));

  }
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>navigate("/blogs"));
  }

  const sendRequest =async()=>{
    const res = await axios.post("https://rock-space-bog.herokuapp.com/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} width={"80%"} display="flex" flexDirection="column" borderColor="green" borderRadius={10} boxShadow="5px 5px 10px #ccc" padding={3} margin={'auto'}>
          <Typography
          fontWeight={'bold'}
          padding={3}
          color="gray"
          variant='h2'
          textAlign={'center'}
          >Post Your Blog</Typography>
          <InputLabel
          sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}
          >Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
          <InputLabel
          sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}
          >Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
          <InputLabel
          sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}
          >ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined' />
          <Button 
          sx={{mt:2, borderRadius:4}} variant="contained" color="warning"
          
          type='submit'> Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog