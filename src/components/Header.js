import React,{useState} from 'react'
import {AppBar, Button,Box, Toolbar, Typography,Tabs, Tab} from '@mui/material'
import { Link } from 'react-router-dom';
import { authAction } from '../store';
import { useSelector,useDispatch } from "react-redux";
const Header = () => {
    const dispatch = useDispatch();
    const [value,setValue] = useState();
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
  return (
    <AppBar position="sticky"  sx={{background:"#445e6f"}}>
        <Toolbar>
            <Typography>Rockspace</Typography>
        <Box display="flex" marginLeft="auto">
            <Tabs  textColor='#e6ffff' value={value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent={Link} to="/" label="Home"/>
                {isLoggedIn && <> <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                <Tab LinkComponent={Link} to="/blogs/add" label="Add blog"/></>  }
            </Tabs>
        </Box>
            <Box display="flex" marginLeft="auto">
               { !isLoggedIn && <Button LinkComponent={Link} to="/auth"  sx={{margin:0.2,background:"#e6ffff",color:"#445e6f",':hover':{color:"#e6ffff",border:"2px solid #ccc"}}} >Login or SignUp</Button>}
               { isLoggedIn &&<Button onClick={()=>dispatch(authAction.logout())} LinkComponent={Link} to="/auth" sx={{margin:0.2,background:"#e6ffff",color:"#445e6f",':hover':{color:"#e6ffff",border:"2px solid #ccc"}}}>Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header