import {  useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../firebase/firebase.utils";

import './header.styles.css'

const Header=()=>{
  const {currentUser}=useContext(UserContext);

    return(
          <div className="navigation">
            <Link className="logo-link" to='/'>
              BroDiary
            </Link>
            <div className="link-cont">
            {
              currentUser ? (<div className="DL-cont">
                <Link className="diary-link" to="/diary">DIARY</Link>
                <span className="headder-link" onClick={signOutUser}>SIGN OUT</span>
                </div>)
                : (<Link className="headder-link" to='/auth'>
                      SIGN IN
                  </Link>
              )
            }
            
            </div>
          </div>
    );
}

export default Header;