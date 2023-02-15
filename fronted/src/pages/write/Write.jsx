import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const{user} = useContext(Context)
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [file,setFile] = useState(null)
  const [image,setImage]= useState("")

  const handleChange =(e)=>{
    setFile(e.target.files[0]);
    setImage(e.target.files[0].name);
  }
  
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append('photo',file)
      formData.append('username',user.username)
      formData.append('title',title)
      formData.append('desc',desc)
      await axios.post("http://localhost:5000/api/posts",formData,{
          headers: {
            'Content-Type': "multipart/form-data"
          }
      })
      .then((response) => {
        window.location.replace("/post/" + response.data._id);
       })
      .catch((err) => {
          console.log(err, "err");
      })
    } catch (error) {
      console.log(error,"fere");
    }
  }
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            id="fileInput" 
            type="file" 
            name='photo'
            style={{ display: "none" }}
              onChange={handleChange}
             />
             {image}
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
