import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { userAPI } from './api/userAPI';
import { postAPI } from './api/postAPI';
import { UserTable, PostTable, LoadButton } from './components';
import './app.css';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      posts: [],
    };

  }

  componentDidMount() {
    this.setState({
      users: [],
      posts: [],
    });

    trackPromise(
      userAPI.fetchUsers()
        .then((users) => {
          this.setState({
            users,
          })
        })
    );

    trackPromise(
      postAPI.fetchPosts()
        .then((posts) => {
          this.setState({
            posts,
          })
        })
    );
  }

  render() {
    return (
      <div>
        <div className="tables">
          <UserTable users={this.state.users} />
          <PostTable posts={this.state.posts} />
        </div>
      </div>
    );
  }
}
