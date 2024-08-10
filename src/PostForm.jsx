import React, { useState } from 'react';

function PostForm({ onAddPost }) {
  const [newPostContent, setNewPostContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (newPostContent.trim() !== '') { // Check if the post is not empty
      onAddPost(newPostContent); // Call the onAddPost function (passed from App)
      setNewPostContent(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
