import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import background from "./images/profile-background-image.png";
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import defaultImage from './images/profile-photo.jpeg';

const Profile = () => {
  const [bio, setBio] = useState(""); // Single bio state
  const [loading, setLoading] = useState(true); // Loading state
  const [userLoaded, setUserLoaded] = useState(false); // State to track if the user is loaded
  const navigate = useNavigate();

  // Function to fetch user bio
  const fetchBio = async (uid) => {
    try {
      const bioDocRef = doc(db, "users", uid); // Use the UID to fetch bio from Firestore
      const docSnap = await getDoc(bioDocRef);

      if (docSnap.exists()) {
        setBio(docSnap.data().bio || "No bio available"); // Set bio if available
      } else {
        setBio("No bio available"); // Fallback if document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching bio:", error);
      setBio("No bio available"); // Set default bio if there's an error
    } finally {
      setLoading(false); // Set loading state to false after data is fetched
    }
  };

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, fetch bio
        fetchBio(user.uid);
        setUserLoaded(true); // Set userLoaded to true after fetching data
      } else {
        // User is not signed in
        setUserLoaded(false);
        setLoading(false); // Stop loading if no user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const handleEdit = async () => {
    navigate("/editprofile");
  };

  // Show loading state while data is fetching or if user is not authenticated
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show content when user data is loaded
  if (!userLoaded) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <div>
        <div>
          <img src={background} alt="background" className="profile-background" />
        </div>
        <div>
          <img
            src={auth?.currentUser?.photoURL || defaultImage}
            alt="profile"
            className="profile-photo"
          />
          <button className="profile-edit" onClick={handleEdit}>
            Edit profile
          </button>
        </div>
        <div>
          <h1>{auth?.currentUser?.displayName}</h1>
        </div>
        <div>
          <p>{bio}</p> {/* Display bio */}
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
