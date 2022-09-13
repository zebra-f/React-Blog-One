import axiosInstance from "../api/axios";
import { useState } from "react";

function ReactTest() {
  const [testState, setTestState] = useState(true);

  if (!testState) {
    return <h2>Test Failed</h2>;
  }

  axiosInstance
    .get("/reacttest")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      setTestState(false);
    });

  return (
    <div className="ReactTest">
      <h1>Testing...</h1>
    </div>
  );
}

export default ReactTest;
