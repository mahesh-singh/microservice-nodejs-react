import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4003/posts/${postId}/comments`, {
      comment,
    });
    setComment("");
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>New Comment</label>
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
