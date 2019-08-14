import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import './App.less';
import Articles from './routes/Articles';
import Test from './routes/Test';
import Admin from './routes/Admin';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      tagList: [],
      filteredPosts: [],
      hasTag: false,
      pageIndex: 0,
      sortStyle: 'dsc'
    };
  }

  componentDidMount() {
    this._getTagsApi();
    this._getPostApi();
    window.addEventListener('scroll', debounce(this._scrollPage, 200));
  }

  _getTagsApi = () => {
    fetch('/api/v1/tags')
      .then(tags => tags.json())
      .then(tags => this.setState({ tagList: tags }));
  };

  _getPostApi = postId => {
    const { posts, pageIndex, sortStyle } = this.state;
    let url = `/api/v1/articles?limit=10&sort=${sortStyle}&pageIndex=${pageIndex}`;
    if (postId) {
      url = `/api/v1/articles/${postId}`;
      fetch(url, {
        method: 'DELETE'
      })
        .then(articles => articles.json());
    } else {
      fetch(url)
        .then(articles => articles.json())
        .then(articles =>
          this.setState({
            posts: [...posts, ...articles.posts],
            pageIndex: pageIndex + 1
          })
        );
    }
  };

  _onSortingBtnClick = sortingValue => {
    const { filteredPosts } = this.state;
    let sortType = sortingValue;
    if (sortType !== 'asc') {
      sortType = 'dsc';
    }
    if (filteredPosts.length) {
      if (sortType === 'asc') {
        this.setState({
          posts: filteredPosts.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
          })
        });
      } else {
        this.setState({
          posts: filteredPosts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          })
        });
      }
    } else {
      this.setState(
        {
          posts: [],
          pageIndex: 0,
          sortStyle: sortType
        },
        () => this._getPostApi()
      );
    }
  };

  _onTagBtnClick = tagId => {
    const { posts } = this.state;
    const filteredPosts = posts.filter(post => {
      if (post.tags.includes(tagId)) {
        return post;
      }
    });
    if (filteredPosts.length) {
      this.setState({
        hasTag: true,
        filteredPosts: filteredPosts
      });
    } else {
      this.setState({
        hasTag: true,
        filteredPosts: []
      });
    }
  };

  _onDeleteClick = postId => {
    console.log('삭제버튼이다 임마~!!');
    console.log(postId);
    this._getPostApi(postId);
  };

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
      this._getPostApi();
    }
  };

  render() {
    const { posts, tagList, filteredPosts, hasTag } = this.state;
    return (
      <Router>
        <div className='menu-button'>
          <Link to='/articles'>Articles</Link>
          <Link to='/admin'>Admin</Link>
        </div>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/articles' />} />
          <Route
            exact
            path='/admin'
            render={() => <Redirect to='/admin/posts' />}
          />
          {hasTag ? (
            <Articles
              posts={filteredPosts}
              tagList={tagList}
              onSortingBtnClick={this._onSortingBtnClick}
              onTagBtnClick={this._onTagBtnClick}
            />
          ) : (
            <Route
              exact
              path='/articles'
              render={() => (
                <Articles
                  posts={posts}
                  tagList={tagList}
                  onSortingBtnClick={this._onSortingBtnClick}
                  onTagBtnClick={this._onTagBtnClick}
                />
              )}
            />
          )}
          <Route path='/articles/:articlesTitle' render={() => <Test />} />
          <Route
            path='/admin'
            render={() => (
              <Admin posts={posts} onDeleteClick={this._onDeleteClick} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
