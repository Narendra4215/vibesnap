import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import background from "./images/profile-background-image.png";

const EditProfile = () => {
    const [name, setName] = useState(auth?.currentUser?.displayName || "");
    const [bio, setBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(auth?.currentUser?.photoURL || "");
    const navigate = useNavigate();

    // Check if the user document exists in Firestore
    const handleSave = async () => {
        try {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(userDocRef);

            // If document doesn't exist, create it with the user's information
            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    displayName: name,
                    bio: bio || "", // Ensure bio is always a string
                    photoURL: profilePhoto,
                });
            } else {
                // If the document exists, update only the bio (and optionally other fields like name or photo)
                await updateDoc(userDocRef, {
                    displayName: name,
                    bio: bio, // Update bio, ensuring only the current user's bio is updated
                    photoURL: profilePhoto,
                });
            }

            alert("Profile updated successfully!");
            navigate("/profile"); // Navigate back to profile page after save
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    // Set bio and other user data
    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setName(userData.displayName || "");
                setBio(userData.bio || "");
                setProfilePhoto(userData.photoURL || "");
            }
        };
        fetchUserData();
    }, []);

    // Handle profile photo change
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePhoto(event.target.result); // Use base64 for demonstration
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        navigate('/profile')
    }

    return (
        <div>
            <div>
                <div onClick={handleCancel} className="edit-cancel">&#8592;</div>
                <img src={background} alt="background" className="profile-background" />
            </div>
            <div>

                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                {profilePhoto && <img src={profilePhoto} alt="Preview" />}
            </div>
            <div className="edit">
                <label>Name:</label>
                <input
                    type="text" className="edit-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Bio:</label>
                <input className="edit-bio"
                    value={bio}
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save Changes</button>
            {/* <button onClick={handleCancel}>Cancel Changes</button> */}
        </div>
    );
};

export default EditProfile;
