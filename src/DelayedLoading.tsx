import React, { useRef, useEffect, useState } from "react";

export const DelayUntilSpinner = 1000;
export const ShowSpinnerForMinimum = 1000;

interface Props {
  isLoading: boolean;
}

let showTimerTimeout: any;
let cancelTimerTimeout: any;

export const DelayedLoading: React.FC<Props> = ({ isLoading, children }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const mountTime = useRef(Date.now());

  useEffect(() => {
    if (isLoading) {
      clearTimeout(cancelTimerTimeout);

      showTimerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, DelayUntilSpinner);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const threshold = DelayUntilSpinner + ShowSpinnerForMinimum;

      const timeTaken = Date.now() - mountTime.current;
      const roundUpTo2 =
        timeTaken >= DelayUntilSpinner && timeTaken <= threshold;
      const timeLeft = roundUpTo2 ? threshold - timeTaken : 0;

      // cancel the delayed timer timeout so it doesn't appear
      // even though loading is finished
      clearTimeout(showTimerTimeout);

      // if we have some time left to show the loading spinner,
      // wrap the setter in a timeout, otherwise hide it straight away
      if (timeLeft > 0) {
        cancelTimerTimeout = setTimeout(() => setShowSpinner(false), timeLeft);
      } else {
        setShowSpinner(false);
      }
    }
  }, [isLoading, showSpinner]);

  if (isLoading) {
    if (!showSpinner) {
      return null;
    }

    if (showSpinner) {
      return <b className="spinner">Loading</b>;
    }
  }

  if (showSpinner) {
    return <b className="spinner">Loading</b>;
  }

  // loading finished, show content
  return <div>{children}</div>;
};
