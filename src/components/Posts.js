import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import PostCreation from "./PostCreation";

function Posts() {
  const [posts, setPosts] = useState([]);
  const { isCreatePost } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, [isCreatePost]);

  const getPosts = async () => {
    const url = "https://brivity-react-exercise.herokuapp.com/posts?page=1";
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="basis-3/4">
      {isCreatePost && <PostCreation />}
      <div className="h-screen overflow-auto">
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
      </div>
    </div>
  );
}

export default Posts;
