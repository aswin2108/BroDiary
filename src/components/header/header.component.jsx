import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import './header.styles.css'

const Header=()=>{
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
            <Link className="signIn-link" to='/sign-in'>
              SIGN IN
            </Link>
            </div>
          </div>
          <Outlet/>
        </Fragment>
    );
}

export default Header;