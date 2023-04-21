import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
const BlogDetail = () => {
  const navigate =useNavigate();
  const id = useParams().id;
  const [blog,setBlog]=useState();
  const [inputs, setInputs] = useState({});

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));

  }
  console.log(id);
  const fetchDetails=async()=>{
    const res = await axios.get(`https://blogs-dwv0.onrender.com/api/blog/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description
      })

    })
  },[id]);

  const sendRequest = async()=>{
    const res = await axios.put(`https://blogs-dwv0.onrender.com/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err))
  }


  console.log(blog);

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs)
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs/"))

  }


  return (
    <div>
      {inputs && 
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
          <Button 
          sx={{mt:2, borderRadius:4}} variant="contained" color="warning"
          
          type='submit'> Submit</Button>
        </Box>
      </form>
      }
    </div>
  )
}

export default BlogDetail