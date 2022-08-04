import React from 'react';

import { someAwesomeMethod } from './someUtils';

const SetTimeoutComponent = () => {
  const [isDone, setIsDone] = React.useState(false);

  const handleThrowAfterTimeout = () => {
    setTimeout(() => {
      throw new Error("Don't panic it is just an exception!");
    }, 10000)
  }

  const handleSetTimeoutWithStateUpdate = () => {
    setTimeout(() => {
      setIsDone(true);
    }, 10000);
  };

  const handleSetTimeoutWithoutStateUpdate = () => {
    setTimeout(() => {
      someAwesomeMethod();
    }, 10000);
  };

  return (
    <div>
      <div>
        {isDone.toString()}
      </div>
      <button onClick={handleSetTimeoutWithStateUpdate}>
        Set timeout with state update
      </button>
      <button onClick={handleSetTimeoutWithoutStateUpdate}>
        Set timeout without state update
      </button>
      <button onClick={handleThrowAfterTimeout}>
        Throw an exception
      </button>
    </div>
  );
};

export default SetTimeoutComponent;
