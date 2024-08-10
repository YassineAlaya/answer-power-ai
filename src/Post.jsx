import React, { useState } from 'react';
import { getAuth } from "firebase/auth"; // Import getAuth

function Post({ content, userEmail, timestamp, postId, onUpdatePost, onDeletePost }) { 
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const auth = getAuth(); // Initialize auth

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdatePost(postId, editedContent); 
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeletePost(postId); // Call onDeletePost from App
  };
  

  return (
    <div className="post">
      <p>Posted by: {userEmail} on {timestamp.toDate().toLocaleString()}</p>
      {isEditing ? (
        <>
          <textarea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <p>{content}</p>
          {auth.currentUser && auth.currentUser.email === userEmail && ( 
            <>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button> 
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Post;
