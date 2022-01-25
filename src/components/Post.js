import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import Comment from "./Comment";
import CommentCreation from "./CommentCreation";
import { getPostCommentsApi } from "../api/commentApi";
import { deletePostApi } from "../api/postApi";

function Post({
  id,
  title,
  body,
  created_at,
  updated_at,
  comment_count,
  user,
}) {
  const { curUser, userAuth, setIsCreatePost, setIsEdit, setPostToEdit } =
    useContext(UserContext);
  const [isCommentDisplay, setIsCommentDisplay] = useState(false);
  const [comments, setComments] = useState([]);
  let curPage = 1;

  const handleDisplayComment = (postId) => {
    setIsCommentDisplay(!isCommentDisplay);
    getPostCommentsApi(postId, setComments, 1);
  };

  const handleLoadMore = (postId, nextPage) => {
    getPostCommentsApi(postId, setComments, nextPage);
  };

  const handleOnEditPost = () => {
    setIsCreatePost(true);
    setIsEdit(true);
    setPostToEdit({
      id,
      title,
      body,
    });
  };
  const formatTimeStamp = (timeStamp) => {
    return new Date(timeStamp).toDateString();
  };

  return (
    <div className="border-solid border-2 border-sky-600 hover:border-amber-600 rounded-lg mt-10 mx-32 p-5 last:mb-5">
      <div className="flex justify-between">
        <p className="text-lg font-bold">{title}</p>
        <div>
          <p className="text-sm">
            Post by: <span className="font-bold">{user.display_name}</span>
          </p>
        </div>
      </div>
      <p className="my-5 mr-10">{body}</p>
      <div className="flex justify-between text-xs text-slate-400 mb-2">
        <p>created at: {formatTimeStamp(created_at)}</p>
        <p>last update: {formatTimeStamp(updated_at)}</p>
      </div>

      <div className="flex justify-between items-center">
        <p
          className="text-sm hover:cursor-pointer font-bold"
          onClick={() => handleDisplayComment(id)}
        >
          {comment_count} Comments
          <span
            className={
              isCommentDisplay
                ? "font-bold text-xs text-white ml-3 p-1 bg-slate-500 rounded hover:bg-slate-400"
                : "font-bold text-xs text-white ml-3 p-1 bg-sky-500 rounded hover:bg-sky-400"
            }
          >
            {isCommentDisplay ? "Close" : "Expand"}
          </span>{" "}
        </p>
        {user.id === curUser.id && (
          <div className="flex justify-end">
            <button
              className="mr-3 px-2 bg-sky-500 p-1 rounded-lg text-white hover:bg-sky-400"
              onClick={handleOnEditPost}
            >
              Edit
            </button>
            <button
              className="px-2 bg-red-500 p-1 rounded-lg text-white hover:bg-red-400"
              onClick={() => deletePostApi(id, userAuth)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-3">
        {isCommentDisplay && (
          <div>
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  {...comment}
                  post_id={id}
                  setComments={setComments}
                />
              );
            })}
            <CommentCreation post_id={id} setComments={setComments} />
          </div>
        )}
      </div>

      <div className="flex justify-center my-3">
        {curPage > 1 && (
          <p
            className="font-bold hover:cursor-pointer text-center mr-3"
            onClick={() => handleLoadMore(--curPage)}
          >
            Previous Page
          </p>
        )}
        {comments && comments.length > 1 && comments.length % 30 === 0 && (
          <p
            className="font-bold hover:cursor-pointer text-center"
            onClick={() => handleLoadMore(id, ++curPage)}
          >
            Next Page
          </p>
        )}
      </div>
    </div>
  );
}

export default Post;
