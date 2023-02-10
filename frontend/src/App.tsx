import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpaceBackground from "./components/SpaceBackground/SpaceBackground";
import Header from "./components/Header/Header";
import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import { UserInterface } from "./interfaces/UserInterface";
import { LoggedInUserContext } from "./context/LoggedInUserContext";
import axios from "./api";

import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserInterface | null>(null);

  const updateUser = async () => {
    axios
      .get("/users/user", {
        withCredentials: true,
        validateStatus: (status) => [200, 403].includes(status),
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            setLoggedInUser(res.data);
            break;
          case 403:
            setLoggedInUser(null);
            break;
        }
      })
      .catch((error) => console.error(error.toJSON()));
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="App">
      <SpaceBackground />

      <main className="content">
        <LoggedInUserContext.Provider
          value={{ user: loggedInUser, update: updateUser }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        </LoggedInUserContext.Provider>
      </main>
    </div>
  );
}

export default App;
