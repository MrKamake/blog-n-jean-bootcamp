import React, { Component } from 'react';
import { BrowserRouter as Route, Link, Switch } from 'react-router-dom';

export default class Articles extends Component {
  constructor(props) {
    super(props);
  }

  _renderPosts = posts => {
    const postList = posts.map(post => {
      return (
        <div className='post-element' key={post.id}>
          <img src={post.thumbnail_image_url} alt={post.id} />
          <span>{post.id}/////</span>
          <span>{post.title}</span>
          <span>{post.by}</span>
          <span>{post.created_at}</span>
          <span>{post.tag}</span>
          <span>{post.comments_count}</span>
        </div>
      );
    });
    return postList;
  };

  render() {
    return <div>{this._renderPosts(this.props.posts)}</div>;
  }
}

//  const RenderPosts = articles => {
//    var result = articles.map(post => {
//      return (
//        <div className="post-element" key={post.id}>
//          <img src={post.thumbnail_image_url} alt={post.id} />
//          <span>{post.id}/////</span>
//          <span>{post.title}</span>
//          <span>{post.by}</span>
//          <span>{post.created_at}</span>
//          <span>{post.tag}</span>
//          <span>{post.comments_count}</span>
//        </div>
//      );
//    });
//    return result;
//  };

// export default function Articles({ articles }) {

//   return <div>{RenderPosts(articles)}</div>;
// }
