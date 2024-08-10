import React from 'react';
import Post from './Post'; // Import the Post component


function PostList({ posts, onUpdatePost, onDeletePost }) {
  return (
    <div>
      {posts.map((post, index) => (
        <Post 
          key={post.id}
          content={post.content} 
          userEmail={post.userEmail} 
          timestamp={post.timestamp} 
          postId={post.id} // Or use post.id if available
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}  
        />
      ))}
    </div>
  );
}


export default PostList;
