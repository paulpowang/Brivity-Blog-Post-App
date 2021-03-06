import React, { useRef, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";
import { editPostApi, createNewPostApi } from "../api/postApi";

function PostCreation() {
  const titleInput = useRef();
  const textBodyInput = useRef();
  const { setIsCreatePost, userAuth, isEdit, postToEdit, setIsEdit } =
    useContext(UserContext);

  const handleOnClose = () => {
    setIsCreatePost(false);
  };

  useEffect(() => {
    if (isEdit) {
      titleInput.current.value = postToEdit.title;
      textBodyInput.current.value = postToEdit.body;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEditPost = (e) => {
    e.preventDefault();
    const post = {
      post: {
        title: titleInput.current.value,
        body: textBodyInput.current.value,
      },
    };
    setIsEdit(false);
    editPostApi(post, postToEdit, userAuth, handleOnClose);
  };

  const handleOnCreatePost = (e) => {
    e.preventDefault();
    const post = {
      post: {
        title: titleInput.current.value,
        body: textBodyInput.current.value,
      },
    };
    createNewPostApi(post, userAuth, handleOnClose);
  };

  return (
    <div className="z-10 fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-20 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Create a new post</p>
            <div
              className="modal-close cursor-pointer z-20"
              onClick={handleOnClose}
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <form className="mt-4 space-y-6 z-50">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-50 sm:text-sm"
                placeholder="Title"
                ref={titleInput}
              />
            </div>
            <div>
              <label htmlFor="text-body" className="sr-only">
                Say Something...
              </label>
              <textarea
                id="text-body"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Say something..."
                ref={textBodyInput}
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                onClick={handleOnClose}
              >
                Close
              </button>
              {isEdit ? (
                <button
                  className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                  onClick={handleOnEditPost}
                >
                  Edit Post
                </button>
              ) : (
                <button
                  className="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                  onClick={handleOnCreatePost}
                >
                  Create Post
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostCreation;
