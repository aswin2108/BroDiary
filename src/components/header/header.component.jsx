import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../firebase/firebase.utils";

import './header.styles.css'

const Header=()=>{
  const {currentUser}=useContext(UserContext);

    return(
        <Fragment>
          <div className="navigation">
            <Link className="logo-link" to='/'>
              BroDiary
            </Link>
            <div className="link-cont">
            <Link className="headder-link" to='/word'>
              WORD
            </Link>
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
          <Outlet/>
        </Fragment>
    );
}

export default Header;