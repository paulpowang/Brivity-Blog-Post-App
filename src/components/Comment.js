import React from "react";

function Comment({ id, content, created_at, updated_at, user }) {
  return (
    <div>
      <p className="mr-5 font-bold">{user.display_name}</p>
      <div className="flex border-solid border-2 border-indigo-600 hover:border-amber-600 rounded-lg p-3">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Comment;
