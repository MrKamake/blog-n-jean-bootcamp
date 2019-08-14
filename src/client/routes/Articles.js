import React, { Component } from 'react';
// import debounce from 'lodash/debounce';
import { BrowserRouter as Route, Link, Switch } from 'react-router-dom';

export default class Articles extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', debounce(this._scrollPage, 200));
  // }

  _renderTagList = tagList => {
    const tagNameList = tagList.map((tag, index) => {
      return (
        <div
          className='tag-list-elements'
          key={index}
          onClick={() => this.props.onTagBtnClick(tag.id)}
        >
          #{tag.name}
        </div>
      );
    });
    return tagNameList;
  };

  _renderPosts = (posts, tagList) => {
    const postList = posts.map(post => {
      if (post) {
        return (
          <div className='post-element' key={post.id}>
            <img src={post.thumbnail_image_url} alt={post.id} />
            {<Link to={`/articles/${post.title}`}>{post.title}</Link>}
            <div>{post.created_at.slice(0, 10)}</div>
            <div>Writer: {post.by}</div>
            <div>Comments: {post.comments_count}</div>
            <div className='tag-box'>
              Tag:
              {post.tags.map(idx => (
                <div key={idx}>#{tagList[idx - 1].name}</div>
              ))}
            </div>
          </div>
        );
      }
    });
    return postList;
  };

  render() {
    const { posts, tagList, onSortingBtnClick } = this.props;
    return (
      <div>
        <button
          className='ascending-btn'
          onClick={() => onSortingBtnClick('asc')}
        >
          오름차순
        </button>
        <button
          className='descending-btn'
          onClick={() => onSortingBtnClick('')}
        >
          내림차순
        </button>
        <div className='tag-list'>
          <div className='tag-list-title'>Tag List</div>
          <div className='tag-list-box'>{this._renderTagList(tagList)}</div>
        </div>
        <div>{this._renderPosts(posts, tagList)}</div>
      </div>
    );
  }
}
