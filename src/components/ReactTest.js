import axiosInstance from "../api/axios";
import { useState } from "react";

function ReactTest() {
  const [testState, setTestState] = useState(true);

  if (!testState) {
    return <h2>Failed</h2>;
  }

  axiosInstance
    .get("/reacttest")
    .then((response) => {
      // pass
    })
    .catch((error) => {
      setTestState(false);
    });

  return (
    <div className="ReactTest">
      <h1>You're logged in...</h1>
    </div>
  );
}

export default ReactTest;
