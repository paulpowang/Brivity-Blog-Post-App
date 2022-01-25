import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserApi } from "../api/signInApi";

function Register() {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const displayName = useRef();
  let navigate = useNavigate();

  const handleOnCreate = (e) => {
    e.preventDefault();
    console.log(
      usernameInput.current.value,
      passwordInput.current.value,
      displayName.current.value
    );
    const user = {
      user: {
        email: usernameInput.current.value,
        password: passwordInput.current.value,
        display_name: displayName.current.value,
      },
    };
    createUserApi(user);

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-24 bg-sky-500 text-white text-7xl rounded flex items-center justify-center pb-2">
            BR
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
            >
              Sign in your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="display_name" className="sr-only">
                Password
              </label>
              <input
                id="display_name"
                name="display_name"
                type="display_name"
                autoComplete="current-display_name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Display Name"
                ref={displayName}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                ref={usernameInput}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordInput}
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleOnCreate}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
