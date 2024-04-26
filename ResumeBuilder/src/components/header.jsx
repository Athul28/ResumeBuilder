import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

function Header() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const { currentUser } = useAuth();

  const [logoutMenu, setLogoutMenu] = useState(false);

  useEffect(() => {
    setLogoutMenu(false);
  }, [userLoggedIn]);

  const logoutMenuHandler = (e) => {
    e.preventDefault();
    setLogoutMenu(!logoutMenu);
  };

  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 border-b place-content-center items-center bg-gray-200">
      {userLoggedIn ? (
        <>
        <p className="m-3 font-bold text-xl">Resume Builder</p>
          <div
            className="ml-auto flex justify-center items-center p-2 space-x-2 hover:cursor-pointer"
            onClick={logoutMenuHandler}
          >
            <p>{currentUser.displayName}</p>
            <img
              src={currentUser.photoURL}
              alt=""
              className="rounded-full h-10 w-10"
            />
          </div>
          {logoutMenu && (
            <div className="absolute border border-black top-16 text-center right-0 w-fit bg-white p-3 mx-2">
                <p>{currentUser.email}</p>
              <button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                className="text-sm text-blue-600 underline"
              >
                Logout
              </button>
            </div>
          )}
          {/* <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button> */}
        </>
      ) : (
        <>
          <Link className="text-sm text-blue-600 underline" to={"/login"}>
            Login
          </Link>
          <Link className="text-sm text-blue-600 underline" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    </nav>
  );
}

export default Header;
