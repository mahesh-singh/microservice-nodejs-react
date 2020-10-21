import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4002/posts", { title });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
