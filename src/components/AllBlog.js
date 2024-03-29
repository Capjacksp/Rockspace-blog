import React from "react";
import {
    Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
const Blog = ({ title, description, imageURL, userName, isUser,id }) => {
    const navigate = useNavigate();
    const handleEdit = ()=>{
        navigate(`/myBlogs/${id}`)
    }
    const deleteRequest = async()=>{
        const res = await axios.delete(`https://blogs-dwv0.onrender.com/api/blog/${id}`).catch(err=>console.log(err))
        const data = await res.data;
        return data;
    }
    const handleDelete=()=>{
        deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))


    }

    console.log(title, isUser);
  return (
    <div style={{backgroundColor:"#e6ffff"}}>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "10px 10px 20px #ccc",
        }}
      >
        {isUser && (
           <Box display="flex">
               <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><EditIcon/></IconButton>
               <IconButton onClick={handleDelete} ><DeleteOutlineIcon/> </IconButton>
           </Box>
        )} 


        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>
            {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
