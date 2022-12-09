import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../firebase/firebase.utils";

import { ThemeContext } from "../../App";

import "./header.styles.css";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="navigation">
      <Link className="logo-link" to="/">
        BroDiary📖
      </Link>
      <label onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </label>
      <ShowLinks />
    </div>
  );
};

function ShowLinks() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="link-cont">
      {currentUser ? (
        <div className="DL-cont">
          <Link className="diary-link" to="/diary">
            DIARY
          </Link>
          <Link className="headder-link" to="/" onClick={signOutUser}>
            SignOut
          </Link>
        </div>
      ) : (
        <Link className="headder-link" to="/auth">
          SIGN IN
        </Link>
      )}
    </div>
  );
}

export default Header;
