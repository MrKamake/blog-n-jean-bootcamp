import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import Articles from './routes/Articles';
import PostDetail from './routes/PostDetail';
import Admin from './routes/Admin';

import './App.less';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      adminPosts: [],
      tagList: [],
      filteredPosts: [],
      hasTag: false,
      pageIndex: 0,
      sortStyle: 'dsc',
      selectedPostId: null,
      postDetail: {},
      comments: [],
      numOfTotalPosts: null,
      appTheme: 'first-ui-theme'
    };
  }

  componentDidMount() {
    this._getTagsApi();
    this._getPostApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedPostId !== this.state.selectedPostId) {
      this._getPostDetailApi();
    }
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
      }).then(articles => articles.json());
    } else {
      fetch(url)
        .then(articles => articles.json())
        .then(articles => {
          this.setState({
            posts: [...posts, ...articles.posts],
            adminPosts: articles.posts,
            pageIndex: pageIndex + 1,
            numOfTotalPosts: articles.total_post_count
          });
        });
    }
  };

  _getAdminPostsApi = pageAction => {
    const { pageIndex } = this.state;
    let url = `/api/v1/articles?limit=10&sort=dsc&pageIndex=${pageIndex}`;
    fetch(url)
      .then(articles => articles.json())
      .then(articles => {
        this.setState({
          adminPosts: articles.posts,
          pageIndex: pageIndex + pageAction
        });
      });
  };

  _handleAdminPage = pageAction => {
    this._getAdminPostsApi(pageAction);
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
    this._getPostApi(postId);
  };

  _onPostClick = postId => {
    this.setState({ selectedPostId: postId });
  };

  _getPostDetailApi = () => {
    const { selectedPostId } = this.state;
    if (selectedPostId) {
      let url = `/api/v1/articles/${selectedPostId}`;
      let url1 = `/api/v1/articles/${selectedPostId}/comments`;

      fetch(url)
        .then(articles => articles.json())
        .then(articles => this.setState({ postDetail: articles }));

      fetch(url1)
        .then(articles => articles.json())
        .then(articles => this.setState({ comments: articles }));
    }
  };

  _themeHandler = themeClassName => {
    this.setState({ appTheme: themeClassName });
  };

  render() {
    const {
      posts,
      adminPosts,
      tagList,
      filteredPosts,
      hasTag,
      postDetail,
      comments,
      numOfTotalPosts,
      pageIndex,
      appTheme
    } = this.state;
    return (
      <Router>
        <div className={`app ${appTheme}`}>
          <div className='header-box'>
            <Link to='/articles' className='main-logo'>
              <span className='main-logo-text'>SJOON</span>
            </Link>
            <Link to='/articles' className='articles-btn'>
              Articles
            </Link>
            <Link to='/admin' className='admin-btn'>
              Admin
            </Link>
          </div>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/articles' />} />
            <Route
              exact
              path='/admin'
              render={() => <Redirect to='/admin/posts' />}
            />
            {hasTag ? (
              <Route
                exact
                path='/articles'
                render={() => (
                  <Articles
                    posts={filteredPosts}
                    tagList={tagList}
                    onSortingBtnClick={this._onSortingBtnClick}
                    onTagBtnClick={this._onTagBtnClick}
                    onPostClick={this._onPostClick}
                  />
                )}
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
                    getPostApi={this._getPostApi}
                    hasTag={hasTag}
                    onPostClick={this._onPostClick}
                  />
                )}
              />
            )}
            <Route
              path='/articles/:articlesTitle'
              render={props => (
                <PostDetail
                  {...props}
                  posts={posts}
                  tagList={tagList}
                  postDetail={postDetail}
                  comments={comments}
                />
              )}
            />

            <Route
              path='/admin'
              render={() => (
                <Admin
                  posts={adminPosts}
                  numOfTotalPosts={numOfTotalPosts}
                  onDeleteClick={this._onDeleteClick}
                  handleAdminPage={this._handleAdminPage}
                  pageIndex={pageIndex}
                  themeHandler={this._themeHandler}
                />
              )}
            />
            <Route
              render={() => (
                <img src='https://assets-global.website-files.com/583347ca8f6c7ee058111b55/5c119a2dd5981b53d6c6017c_Ple50J6633qc8KznW5ODN5GYL_FQTWHh4JEDgk5m4069omxEx045htNlfwGYHolbU0J5cc-fiamj5mx7VSIGCLOM1kSkmCCF8k3Cau-Hk3B-vu04sQ0yA74m9UtyLw3YO3cj_n5a.gif' />
              )}
            />
          </Switch>
          <footer>
            <li>Producer: SeongJoon Kim</li>
            <li>General Supervisor: Ken Huh</li>
            <li>Assistant Supervisor: kizmo</li>
            <li>Super Supporter: MyeongWon Cho</li>

            <a
              className='vanilla-coding-logo'
              href='https://www.vanillacoding.co'
            >
              <img src='https://d1sk7biawly96w.cloudfront.net/images/vc_logo@2x.png' />
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}
