import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Theme from './Theme';

const Admin = ({
  posts,
  pageIndex,
  numOfTotalPosts,
  onDeleteClick,
  handleAdminPage,
  themeHandler
}) => {
  return (
    <Router>
      <div className='admin-box'>
        <div className='admin-select-box'>
          <Link to='/admin/posts'>Posts</Link>
          <Link to='/admin/theme'>Theme</Link>
        </div>
        {pageIndex !== 1 ? (
          <button className='prev-btn' onClick={() => handleAdminPage(-1)}>
            prev
          </button>
        ) : null}
        {numOfTotalPosts / 10 !== pageIndex ? (
          <button className='next-btn' onClick={() => handleAdminPage(1)}>
            next
          </button>
        ) : null}
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
        <Route
          path='/admin/theme'
          render={() => <Theme themeHandler={themeHandler} />}
        />
      </div>
    </Router>
  );
};

export default Admin;
