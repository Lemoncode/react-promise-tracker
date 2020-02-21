import React from "react";
import { Link } from "react-router-dom";
import {
  trackPromise,
  manuallyResetPromiseCounter
} from "../../../../../build/es";
import { postAPI } from "../../api/post-api";
import { PostTable } from "./components";

export const PostPage = () => {
  let isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    trackPromise(
      postAPI
        .fetchPosts()
        .then(posts => isMounted.current && setPosts(posts))
        .catch(error => console.log(error))
    );

    return () => manuallyResetPromiseCounter();
  }, []);

  return (
    <div>
      <h2>Posts Page</h2>
      <Link to="/">Navigate to User Page</Link>
      <br />
      <Link to="/another">Navigate to Another Page</Link>
      <br />
      <PostTable posts={posts} />
    </div>
  );
};
