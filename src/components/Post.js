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

  const handleDisplayComment = (postId) => {
    setIsCommentDisplay(!isCommentDisplay);
    getPostCommentsApi(postId, setComments);
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

  return (
    <div className="border-solid border-2 border-indigo-600 hover:border-amber-600 rounded-lg mt-10 mx-5 p-5 last:mb-5 hover:cursor-pointer">
      <div className="flex justify-between">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm">
          Post by: <span className="font-bold">{user.display_name}</span>
        </p>
      </div>
      <p className="my-5">{body}</p>
      <div className="flex justify-between ">
        <p className="text-sm">created at: {created_at}</p>
        <p className="text-sm">last update: {updated_at}</p>
      </div>

      {user.id === curUser.id && (
        <div className="flex justify-end">
          <button className="mr-3" onClick={handleOnEditPost}>
            Edit
          </button>
          <button onClick={() => deletePostApi(id, userAuth)}>Delete</button>
        </div>
      )}
      <p
        className="text-sm hover:cursor-pointer"
        onClick={() => handleDisplayComment(id)}
      >
        {comment_count} Comments
        <span className="font-bold text-2xl ml-3">
          {isCommentDisplay ? "-" : "+"}
        </span>{" "}
      </p>
      <div className="cursor-default">
        {isCommentDisplay && (
          <div>
            {comments.map((comment) => {
              return <Comment key={comment.id} {...comment} />;
            })}
            <CommentCreation post_id={id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
