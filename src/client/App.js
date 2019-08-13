import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './App.less';
import Articles from './routes/Articles';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      numOfAlticles: 10,
      tagList: []
    };
  }

  componentDidMount() {
    this._getPostApi();
    this._getTagsApi();
    window.addEventListener('scroll', debounce(this._scrollPage, 200));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this._scrollPage, 200));
  }

  _getPostApi = sortingStyle => {
    const { numOfAlticles } = this.state;
    const sortingBtn = sortingStyle ? 'asc' : 'dsc';
    let url = `/api/v1/articles?limit=${numOfAlticles}&sort=${sortingBtn}`;

    fetch(url)
      .then(articles => articles.json())
      .then(articles => this.setState({ posts: articles.posts }));
  };

  _getTagsApi = () => {
    fetch('/api/v1/tags')
      .then(tags => tags.json())
      .then(tags => this.setState({ tagList: tags }));
  };

  _onSortingClick = sortingValue => {
    this._getPostApi(sortingValue);
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
      this.setState({
        numOfAlticles: this.state.numOfAlticles + 10
      });
      this._getPostApi();
    }
  };

  _renderTagList = tagList => {
    const tagNameList = tagList.map((tag, index) => {
      return (
        <div className='tag-list-elements' key={index}>
          {tag.name}
        </div>
      );
    });
    return tagNameList;
  };

  render() {
    const { posts, tagList } = this.state;
    return (
      <Router>
          <button
            className='ascending-btn'
            onClick={this._onSortingClick.bind(this, 'asc')}
          >
            오름차순
          </button>
          <button
            className='descending-btn'
            onClick={this._onSortingClick.bind(this, '')}
          >
            내림차순
          </button>
          <div className='tag-list'>
            <div className='tag-list-title'>Tag List</div>
            <div className='tag-list-box'>{this._renderTagList(tagList)}</div>
          </div>
          <Route exact path='/' render={() => <Redirect to='/articles' />} />
          <Route path='/articles' render={() => <Articles posts={posts} />} />
      </Router>
    );
  }
}
