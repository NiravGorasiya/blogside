import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [categoryData,setCategoryData] = useState([])

  const categoryList = async()=>{
   const res = await axios.get("http://localhost:5000/api/categories")
   setCategoryData(res.data)

  }
  useEffect(()=>{
      categoryList()
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://thumbs.dreamstime.com/b/blog-top-view-hands-keyboard-62012825.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {
          categoryData.map((item)=>(
                <Link className="link" to={`/?cat=${item.name}`}>
                  <li className="sidebarListItem">
                     {item.name}
                  </li>
                </Link>
          ))
        }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
