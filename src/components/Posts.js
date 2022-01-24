import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import PostCreation from "./PostCreation";
import { getPosts } from "../api/postApi";

function Posts() {
  const [posts, setPosts] = useState([]);
  const { isCreatePost } = useContext(UserContext);

  useEffect(() => {
    getPosts(setPosts);
  }, [isCreatePost]);

  return (
    <div className="mx-20 mb-10">
      {isCreatePost && <PostCreation />}
      <div className=" overflow-auto">
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
      </div>
    </div>
  );
}

export default Posts;
