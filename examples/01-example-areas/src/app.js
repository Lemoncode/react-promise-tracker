import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { userAPI } from './api/userAPI';
import { postAPI } from './api/postAPI';
import { UserTable, PostTable, LoadButton } from './components';
import { areas } from './common/constants/areas';
import './app.css';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      posts: [],
    };

    this.onLoadUsers = this.onLoadUsers.bind(this);
    this.onLoadPosts = this.onLoadPosts.bind(this);
  }

  onLoadUsers() {
    this.setState({
      users: [],
    });

    trackPromise(
      userAPI.fetchUsers()
        .then((users) => {
          this.setState({
            users,
          })
        }),
        areas.user,
    );
  }

  onLoadPosts() {
    this.setState({
      posts: [],
    });

    trackPromise(
      postAPI.fetchPosts()
        .then((posts) => {
          this.setState({
            posts,
          })
        }),
        areas.post,
    );
  }

  render() {
    return (
      <div>
        <div className="load-buttons">
          <LoadButton
            onLoad={this.onLoadUsers}
            title="Load users with delay"
          />
          <LoadButton
            onLoad={this.onLoadPosts}
            title="Load posts with delay"
          />
        </div>
        <div className="tables">
          <UserTable users={this.state.users} />
          <PostTable posts={this.state.posts} />
        </div>
      </div>
    );
  }
}
