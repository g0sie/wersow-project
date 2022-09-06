import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const fetchApi = async () => {
    const response = await fetch(
      "https://wersow-api.herokuapp.com/api/videos/todays"
    );
    const data = await response.json();
    console.log(data);
    // setMessage(data.message);
  };

  useEffect(() => {
    fetchApi();
  }, [message]);

  return (
    <div className="App">
      <h1>{message}</h1>
      <iframe
        src="https://www.youtube.com/embed/TAhLF17C0DI"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default App;
