import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Post from "./Post";
import PostCreation from "./PostCreation";
import { getPosts } from "../api/postApi";

function Posts() {
  const [posts, setPosts] = useState([]);
  const { isCreatePost } = useContext(UserContext);
  let curPage = 1;
  useEffect(() => {
    getPosts(setPosts, 1);
  }, [isCreatePost, posts]);

  const handleLoadMore = (nextPage) => {
    getPosts(setPosts, nextPage);
  };

  return (
    <div className="mx-20 mb-10">
      {isCreatePost && <PostCreation />}
      <div className=" overflow-auto">
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        <div className="flex justify-center my-3">
          {curPage > 1 && (
            <p
              className="font-bold hover:cursor-pointer text-center mr-3"
              onClick={() => handleLoadMore(--curPage)}
            >
              Previous Page
            </p>
          )}
          {posts && posts.length > 1 && posts.length % 30 === 0 && (
            <p
              className="font-bold hover:cursor-pointer text-center"
              onClick={() => handleLoadMore(++curPage)}
            >
              Next Page
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
