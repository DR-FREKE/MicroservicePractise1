import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/blog");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderAllPost = Object.values(posts).map((content) => (
    <div
      key={content.id}
      className="card"
      style={{
        width: "30%",
        marginBottom: "20px",
        marginRight: "20px",
      }}>
      <div className="card-body">
        <h5>{content.title}</h5>
        <CommentList comments={content.comments} />
        <CommentCreate postId={content.id} />
      </div>
    </div>
  ));

  return <div className="d-flex flex-row flex-wrap">{renderAllPost}</div>;
};

export default PostList;
