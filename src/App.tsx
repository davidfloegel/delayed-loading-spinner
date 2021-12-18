import { useState, useEffect } from "react";
import "./App.css";

import { DelayedLoading } from "./DelayedLoading";

function App() {
  const [timeToLoad, setTimeToLoad] = useState(1500);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), timeToLoad);
  }, []);

  const triggerLoad = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), timeToLoad);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <div className="container">
          <div className="row">
            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setTimeToLoad(parseInt(e.target.value, 10))}
              >
                <option disabled>Select time for mock request</option>
                <option value="500" selected={timeToLoad === 500}>
                  500ms
                </option>
                <option value="1500" selected={timeToLoad === 1500}>
                  1500ms
                </option>
                <option value="3000" selected={timeToLoad === 3000}>
                  3000ms
                </option>
              </select>
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                onClick={triggerLoad}
              >
                Trigger load
              </button>
            </div>
            <div className="col">
              request finished?: {isLoading ? "no" : "yes"}
            </div>
          </div>
        </div>
      </div>

      <div className="demo">
        <DelayedLoading isLoading={isLoading}>
          <b>Content</b>
        </DelayedLoading>
      </div>
    </div>
  );
}

export default App;
