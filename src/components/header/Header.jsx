import { Link } from "react-router-dom";
import Search from "../search/Search";
import { useState, useContext } from "react";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import { FaHeart } from "react-icons/fa";
import AuthenticatedContext from "../../context/AuthenticatedContext";
import Toast from "../Toast/Toast";

export default function Header() {
  const [display, setDisplay] = useState({ login: false, register: false });
  const { authenticated } = useContext(AuthenticatedContext);

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            <span>Hotelfinder</span>
            <strong>Book Hotels with ease</strong>
          </Link>
        </div>
        <Search />

        {authenticated ? (
          <div className="profile-favorite">
            <Link to="/Favorites">
              <div className="favorite-icon-header">
                <FaHeart />
              </div>
            </Link>
            <Profile />
          </div>
        ) : (
          <div className="login-register">
            <button
              onClick={() => setDisplay({ ...display, login: true })}
              className="button"
            >
              Log in
            </button>
            <button
              onClick={() => setDisplay({ ...display, register: true })}
              className="button"
            >
              Register
            </button>
          </div>
        )}
        {/*Logged in*/}
      </header>

      {/* Displays modals */}
      {display.login && <Login display={display} setDisplay={setDisplay} />}
      {display.register && (
        <Register display={display} setDisplay={setDisplay} />
      )}

      {authenticated && <Toast type="success" message="Welcome back Maria!" />}
    </>
  );
}