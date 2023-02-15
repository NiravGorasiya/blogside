import { Link } from "react-router-dom";
import "./singlePost.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const {id }= useParams()
  const [post,setPosts] = useState({})
  const {user} = useContext(Context)
  const [photo,setPhoto] = useState("")
  const PF = "http://localhost:5000/images/";
  const[title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [updateMode,setUpdateMode] = useState(false)

  const handleDelete =async()=>{
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`,{
        data:{username:user.username}
      })
      window.location.replace("/");
    } catch (error) {
    }
  }
  
  const postList =async()=>{
    const res =await axios.get(`http://localhost:5000/api/posts/${id}`)
    setPosts(res.data)
    setTitle(res.data.title)
    setDesc(res.data.desc)
    setPhoto(res.data.photo)
  }

  const handleUpdate =async()=>{
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`,{
        username:user.username,
        title,
        desc
      })
      setUpdateMode(false)

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    postList()
  },[id])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
       {post.photo && (
          <img src={`http://localhost:5000/${post.photo}`} alt="blog image" className="singlePostImg" />
        )}
        {
          updateMode?(
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              onChange={(e)=>setTitle(e.target.value)}
            />
          ):(
            <h1 className="singlePostTitle">
             {title}
            <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}>
            </i>
          </div>
          </h1>    
          )
        }
          <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {
          updateMode?(
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
            />
          ):(
            <p className="singlePostDesc">{desc}</p>
          )
        }
        {
          updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )
        }        
      </div>
    </div>
  );
}
