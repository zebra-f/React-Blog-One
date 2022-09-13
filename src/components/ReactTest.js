import axiosInstance from "../api/axios";
import { useState } from "react";

function ReactTest() {
  const [testState, setTestState] = useState(true);
  axiosInstance
    .get("/reacttest")
    .then((response) => {
      setTestState(response);
    })
    .catch((error) => {
      setTestState(false);
    });

  if (!testState) {
    return <h2>Test Failed</h2>;
  }
  return (
    <div className="ReactTest">
      <h1>Test</h1>
    </div>
  );
}

export default ReactTest;
