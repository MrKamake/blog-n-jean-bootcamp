import React, { Component } from 'react';
import { BrowserRouter as Route, Link, Switch } from 'react-router-dom';
import debounce from 'lodash/debounce';

export default class Articles extends Component {
  constructor(props) {
    super(props);

    this.scrollEvent = debounce(this._scrollPage, 200);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollEvent);
  }

  componentDidUpdate() {
    if (this.props.hasTag) {
      window.removeEventListener('scroll', this.scrollEvent);
    } else {
      window.addEventListener('scroll', this.scrollEvent);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  _scrollPage = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight <= 200) {
      if (this.props.getPostApi) {
        this.props.getPostApi();
      }
    }
  };

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
    const { onPostClick } = this.props;
    const postList = posts.map(post => {
      if (post) {
        return (
          <div className='post-element' key={post.id}>
            <div
              className='post-image'
              style={{ backgroundImage: `url(${post.thumbnail_image_url})` }}
            />
            {/* <img src={post.thumbnail_image_url} alt={post.id} /> */}
            <div className='post-ceated-day'>
              {post.created_at.slice(0, 10)}
            </div>
            <div className='post-by'>{post.by}</div>
            {
              <Link to={`/articles/${post.title}`} className='post-title'>
                <div onClick={() => onPostClick(post.id)}>{post.title}..</div>
              </Link>
            }
            <div className='post-comments'>{post.comments_count}</div>
            <div className='tag-box'>
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
        <div className='main-image'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg/600px-Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg' />
        </div>
        <div className='articles-box'>
          <div className='tag-list'>
            <div>{this._renderTagList(tagList)}</div>
          </div>
        </div>
        <div className='sort-box'>
          <button
            className='ascending-btn'
            onClick={() => onSortingBtnClick('asc')}
          >
            Oldest
          </button>
          <button
            className='descending-btn'
            onClick={() => onSortingBtnClick('')}
          >
            Newest
          </button>
        </div>
        <div className='posts-box'>{this._renderPosts(posts, tagList)}</div>
      </div>
    );
  }
}
