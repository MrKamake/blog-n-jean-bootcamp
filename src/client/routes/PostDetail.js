import React, { Component } from 'react';

export default class PostDetail extends Component {
  render() {
    const { posts, tagList, postDetail, comments } = this.props;
    const postDetailUrl = this.props.match.params.articlesTitle;

    if (!posts.filter(post => post.title === postDetailUrl).length) {
      return (
        <img className='error-page' src='https://assets-global.website-files.com/583347ca8f6c7ee058111b55/5c119a2dd5981b53d6c6017c_Ple50J6633qc8KznW5ODN5GYL_FQTWHh4JEDgk5m4069omxEx045htNlfwGYHolbU0J5cc-fiamj5mx7VSIGCLOM1kSkmCCF8k3Cau-Hk3B-vu04sQ0yA74m9UtyLw3YO3cj_n5a.gif' />
      );
    }

    if (!Object.keys(postDetail).length) {
      return null;
    }
    const sortedComments = comments.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    return (
      <div className='post-detail-element'>
        <div className='post-detail-title'>{postDetail.title}</div>
        <div className='post-detail-by'>By: {postDetail.by}</div>
        <div className='post-detail-time'>
          {postDetail.created_at
            ? postDetail.created_at.slice(11, 19)
            : null}
        </div>
        <div className='post-detail-day'>
          {postDetail.created_at
            ? postDetail.created_at.slice(0, 10)
            : null}
        </div>
        {postDetail.tags ? (
          <div className='tag-box'>
            {postDetail.tags.map(idx => (
              <div key={idx}>#{tagList[idx - 1].name}</div>
            ))}
          </div>
        ) : null}
        <p>{postDetail.body}</p>
        <div className='post-detail-comments'>
          <div className='comments-title'>Comments</div>
          {sortedComments.map(comment => (
            <div className='post-detail-comment' key={comment.id}>
              <div>{comment.text}</div>
              <div>
                {`${comment.created_at.slice(0, 10)} ${comment.created_at.slice(11, 19)}`}
              </div>
              <div>{comment.by}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
