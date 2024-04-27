import React,{useState,useEffect} from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

function Header() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const { currentUser } = useAuth();


  const location = useLocation();


  return (
    <nav className="flex flex-row gap-x-2 w-full z-20 p-2 max-sm:p-0 fixed justify-between items-center bg-cyan-700 text-white">
      {userLoggedIn ? (
        <>
          <p className="m-3 font-bold text-2xl text-white ml-5">Resume Builder</p>
          <div
            className="ml-auto flex justify-center items-center p-2 space-x-2 hover:cursor-pointer"
          >
            <p className="text-xl max-sm:hidden">{currentUser.displayName}</p>
            <img
              src={currentUser.photoURL}
              alt="Profile Image"
              className="rounded-full h-10 w-10 max-sm:h-8 max-sm:w-8"
            />
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
              className="text-sm bg-red-600 p-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl text-white ml-5">Resume Builder</p>
          <div className="flex space-x-3 text-white my-2 mx-4">
            <Link className={`hover:underline  ${location.pathname==='/' ? 'hidden':''}`} to={"/"}>
              Home
            </Link>
            <Link className={`hover:underline  ${location.pathname==='/login' ? 'hidden':''}`} to={"/login"}>
              Login
            </Link>
            <Link className={`hover:underline  ${location.pathname==='/register' ? 'hidden':''}`} to={"/register"}>
              Register New Account
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default Header;
