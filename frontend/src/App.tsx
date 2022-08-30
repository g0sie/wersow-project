import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const fetchApi = async () => {
    const response = await fetch("https://wersow-api.herokuapp.com/api/");
    const data = await response.json();
    setMessage(data.message);
  };

  useEffect(() => {
    fetchApi();
  }, [message]);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
