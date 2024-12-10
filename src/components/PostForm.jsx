// src/PostForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase';

const PostForm = () => {
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === '') return;

        await addDoc(collection(db, 'posts'), {
            text,
            images,
            timestamp: new Date(),
            uid: auth.currentUser.uid,
        });

        setText('');
        setImages([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
            <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;