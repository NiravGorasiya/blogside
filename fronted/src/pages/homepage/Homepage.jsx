import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const [posts,setPosts] = useState([])
  const { search } = useLocation();

  const postList =async()=>{
   const res =await axios.get("http://localhost:5000/api/posts" +search)
    setPosts(res.data)
  }
  useEffect(()=>{
    postList()
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
