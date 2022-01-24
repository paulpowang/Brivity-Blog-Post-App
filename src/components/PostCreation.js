import React, { useRef, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { UserContext } from "../context/UserContext";

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
    editPostApi(post);
  };

  const editPostApi = async (post) => {
    const hostUrl = "https://brivity-react-exercise.herokuapp.com/";
    const url = hostUrl + `posts/${postToEdit.id}`;
    try {
      const respond = await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: userAuth,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(post), // body data type must match "Content-Type" header
      });
      const data = await respond.json();

      console.log(data);
      handleOnClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnCreatePost = (e) => {
    e.preventDefault();
    const post = {
      post: {
        title: titleInput.current.value,
        body: textBodyInput.current.value,
      },
    };
    createNewPostApi(post);
  };

  const createNewPostApi = async (post) => {
    const url = "https://brivity-react-exercise.herokuapp.com/posts";
    try {
      const respond = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          authorization: userAuth,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(post), // body data type must match "Content-Type" header
      });
      const data = await respond.json();

      console.log(data);
      handleOnClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 fixed w-full h-full top-0 left-0 flex items-center justify-center">
      Post Creation
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-50 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                  onClick={handleOnEditPost}
                >
                  Edit Post
                </button>
              ) : (
                <button
                  className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
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
