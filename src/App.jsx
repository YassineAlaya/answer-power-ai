import React, { useState, useEffect } from 'react';
import './App.css';
import PostForm from './PostForm';
import PostList from './PostList';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // Import Timestamp
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { signOut } from "firebase/auth"; // Import signOut
import { onSnapshot } from "firebase/firestore"; // Import onSnapshot



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Assuming 'app' is your initialized Firebase app


function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const
  fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, [])
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe(); 
  }, []);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe(); 
  }, []);

  const handleAddPost = async (newPostContent) => {
    try {
      const currentUser = auth.currentUser; 
      const docRef = await addDoc(collection(db, "posts"), {
        content: newPostContent,
        userEmail: currentUser.email, 
        userId: currentUser.uid, // Include user ID if available
        timestamp: Timestamp.now(), 
        likes: 0,
        likedBy: [],
        comments: [] 
      });
      console.log("Document written with ID: ", docRef.id);
      // ... (You might want to fetch the updated posts from Firestore here)
    } catch (e) {
      console.error("Error adding document: ", e);
      // ... (Handle the error appropriately, e.g., display an error message)
    }
  };

  const handleLogin = () => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  };

  const handleRegister = () => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  };

  const onUpdatePost = (postId, newContent) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, content: newContent } : post
    ));
  };
  const onDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      console.log("Document deleted with ID: ", postId);
      // Update the posts state to remove the deleted post
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting document: ", error);
      // ... (Handle the error appropriately, e.g., display an error message)
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      // You might want to redirect the user to the login page or clear any local data
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="app-container">
      <h1>My Social Media App</h1>

      {user ? (
        <>
          <PostForm onAddPost={handleAddPost} />
          <PostList posts={posts} onUpdatePost={onUpdatePost} onDeletePost={onDeletePost} />
          <button onClick={handleLogout}>Logout</button> 
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <RegistrationForm onRegister={handleRegister} />
        </>
      )}
    </div>
  );
}

export default App;
