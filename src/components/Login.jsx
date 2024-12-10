import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { googleProvider, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

    const handleGoogle=async()=>{
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/feeds");
            console.log('User created successfully!');
          } catch (error) {
            console.error('Error signing in:', error.message);
          }
    }
  return (
    <div>
        <div>

        <h3>VibeSnap</h3>
        <div>Moments That Matter, Shared Foreever</div>
        <button onClick={handleGoogle}>Continue With Google</button>
        </div>

    </div>
  )
}

export default Login