import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import FloatingActionButton from "./FloatingActionButton";
import { useNavigate } from "react-router-dom";
import  defaultImage from './images/profile-photo.jpeg';
import { formatDistanceToNow } from 'date-fns';

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);
  console.log(auth?.currentUser?.photoURL);

  const handleClickPhoto = async()=>{
    navigate("/profile");
  }
  
  return (
    <div>
      <div>
        <img src={auth?.currentUser?.photoURL || defaultImage} height={"100px"} onClick={handleClickPhoto}  alt="" />
        <h1>{auth?.currentUser?.displayName}</h1>
      </div>
      <div>
        feeds
      </div>

      <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <p>{post.text}</p>
          {post.media?.map((item, index) =>
            item.type.startsWith("image/") ? (
              <img key={index} src={item.data} alt="post" style={{ maxWidth: "50%", maxHeight: "200px" }} />
            ) : (
              <video key={index} src={item.data} controls style={{ maxWidth: "100%" }} />
            )
          )}
          {/* <p>{new Date(post.timestamp?.toDate()).toLocaleString()}</p> */}
          <p>{formatDistanceToNow(new Date(post.timestamp?.toDate()), { addSuffix: true })}</p>
        </div>
      ))}
      </div>
      <FloatingActionButton />
    </div>
  )
}

export default Feeds;