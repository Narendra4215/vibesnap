import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMedia((prev) => [
          ...prev,
          { data: event.target.result, type: file.type },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePost = async () => {
    if (!text && media.length === 0) {
      alert("Please add text or media to your post.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        text,
        media,
        timestamp: serverTimestamp(),
      });
      alert("Post created successfully!");
      setText("");
      setMedia([]);
      toggleModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const toggleModal = (show) => {
    const modal = document.getElementById("createPostModal");
    if (modal) {
      modal.style.display = show ? "block" : "none";
    }
  };

  return (
    <div
      id="createPostModal"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "#fff",
          maxWidth: "500px",
          borderRadius: "10px",
        }}
      >
        <h2>Create Post</h2>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaSelect}
          style={{ margin: "10px 0" }}
        />
        <div style={{ margin: "10px 0" }}>
          {media.map((item, index) =>
            item.type.startsWith("image/") ? (
              <img
                key={index}
                src={item.data}
                alt="preview"
                style={{
                  maxWidth: "50%",
                  maxHeight: "150px",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <video
                key={index}
                src={item.data}
                controls
                style={{
                  maxWidth: "100%",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              />
            )
          )}
        </div>
        <button
          onClick={handlePost}
          style={{
            margin: "10px 5px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
        <button
          onClick={() => toggleModal(false)}
          style={{
            margin: "10px 5px",
            padding: "10px 20px",
            backgroundColor: "#ddd",
            color: "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
