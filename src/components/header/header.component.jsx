import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import './header.styles.css'

const Header=()=>{
  const {currentUser}=useContext(UserContext);
  console.log(currentUser);
    return(
        <Fragment>
          <div className="navigation">
            <Link className="logo-link" to='/'>
              BRO DIARY
            </Link>
            <div className="link-cont">
            <Link className="word-link" to='/word'>
              WORD
            </Link>
            <Link className="signIn-link" to='/auth'>
              SIGN IN
            </Link>
            </div>
          </div>
          <Outlet/>
        </Fragment>
    );
}

export default Header;