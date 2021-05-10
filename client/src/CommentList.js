import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId, comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchComment = async () => {
  //   const res = await axios.get(`http://localhost:4001/post/${postId}/comment`);
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   // fetchComment();
  // }, []);
  return (
    <div>
      <ul>
        {comments.map((content) => (
          <li key={content.commentId}>
            {content.status == "pending"
              ? "awaiting approval"
              : content.content}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CommentList;
