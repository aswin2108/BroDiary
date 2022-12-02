import React from "react";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import Spinner from "../spinner/spinner.component";

const Greeting = () => {
  const { currentUser, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  return (
    <div>
      {!isLoading && currentUser.displayName ? (
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
