import React from "react";

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    return (
      <>
        {" "}
        <div>
          {comment.comment} -- <i>{comment.status}</i>
        </div>
        <br />
      </>
    );
  });
  return (
    <>
      <h2>Comments</h2>
      {renderedComments}
    </>
  );
};
