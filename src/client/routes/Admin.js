import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Admin = ({ posts, onDeleteClick }) => {
  return (
    <Router>
      <div className='admin-box'>
        <Link to='/admin/posts'>Posts</Link>
        <Link to='/admin/theme'>Theme</Link>
      </div>
      <Route
        path='/admin/posts'
        render={() =>
          posts.map(post => {
            return (
              <div className='post-element' key={post.id}>
                <div>{post.title}</div>
                <div>{post.by}</div>
                <div>{post.created_at}</div>
                <button
                  className='delete-btn'
                  onClick={() => onDeleteClick(post.id)}
                >
                  Delete
                </button>
              </div>
            );
          })
        }
      />
      {/* <Route path='/admin/theme' render={() => <Posts />} /> */}
    </Router>
  );
};

export default Admin;
