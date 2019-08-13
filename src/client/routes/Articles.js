import React, { Component } from 'react';
import { BrowserRouter as Route, Link, Switch } from 'react-router-dom';

export default class Articles extends Component {
  constructor(props) {
    super(props);
  }

  _renderPosts = (posts, tagList) => {
    const postList = posts.map(post => {
      return (
        <div className='post-element' key={post.id}>
          <img src={post.thumbnail_image_url} alt={post.id} />
          {<Link to={`/articles/${post.title}`}>{post.title}</Link>}
          <div>{post.by}</div>
          <div>{post.created_at}</div>
          {post.tags.map(idx => (
            <div key={idx}>{tagList[idx - 1].name}</div>
          ))}
          <div>{post.comments_count}</div>
        </div>
      );
    });
    return postList;
  };

  render() {
    const { posts, tagList } = this.props;
    return <div>{this._renderPosts(posts, tagList)}</div>;
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
