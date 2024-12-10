import React from "react";
import CreatePost from "./CreatePost";

const FloatingActionButton = () => {
//   const handleCreatePost = () => {
//     const modal = document.getElementById("createPostModal");
//     modal.style.display = "block";
//   };

  return (
    <>
<button
  onClick={() =>
    document.getElementById("createPostModal").style.display = "block"
  }
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "15px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    zIndex: 1000,
  }}
>
  +
</button>
<CreatePost />

    </>
  );
};

export default FloatingActionButton;
