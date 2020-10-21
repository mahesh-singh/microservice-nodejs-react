import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4004/posts");
    setPosts(res.data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div kay={post.id}>
        {post.title}
        <br />
        <CommentCreate postId={post.id} />
        <br />
        <CommentList comments={post.comments} />
      </div>
    );
  });
  return renderedPosts;
};
