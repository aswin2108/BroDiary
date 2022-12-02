import React from "react";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import Spinner from "../spinner/spinner.component";

const Greeting = () => {
  const { currentUser, isUserContextLoading } = useContext(UserContext);

  if (isUserContextLoading) {
    return <Spinner loading={isUserContextLoading} />;
  }

  return (
    <div>
      {!isUserContextLoading && currentUser.displayName ? (
        <h2>
          Hi {currentUser.displayName}👋🏻 share your day, we'll keep it safe!
        </h2>
      ) : (
        <h2>Hi 👋🏻 share your day, we'll keep it safe!</h2>
      )}
    </div>
  );
};

export default Greeting;
