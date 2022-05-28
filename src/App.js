import React, { useEffect } from "react";
import { Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store";

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector(state=>state.isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispath(authAction.login())
    }
  },[dispath])
  return (
      <React.Fragment>
        <header>
      <Header/>
      </header>
      <main >
        <Routes>
          { !isLoggedIn ?<> <Route path='/auth' element={<Auth/>}/>
          <Route path='/' element={<Blogs/>}/>
          </>
          :
          <>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/myBlogs' element={<UserBlogs/>}/>
          <Route path='/myBlogs/:id' element={<BlogDetail/>}/>
          <Route path='/blogs/add' element={<AddBlog/>}/>
          </>
}
        </Routes>
      </main>
    
    </React.Fragment>
  );
}

export default App;
