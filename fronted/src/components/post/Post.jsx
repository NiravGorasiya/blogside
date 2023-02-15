import "./post.css";
import { Link } from "react-router-dom";

export default function Post({post}) {
  console.log(post);
  return (
    <div className="post" key={post.key}>
      <img
        className="postImg"
        src={`http://localhost:5000/${post.photo}`}
        alt={post.photo}
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <Link to={`/post/${post._id}`} className="link">ssdd</Link>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
