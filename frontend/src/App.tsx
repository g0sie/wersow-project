import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpaceBackground from "./components/SpaceBackground/SpaceBackground";
import Header from "./components/Header/Header";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import axios from "./api";

import "./App.css";

interface UserInterface {
  name: "string";
}

export const LoggedInUserContext = createContext<UserInterface | null>(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserInterface | null>(null);

  const getAuthenticatedUser = async () => {
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
    getAuthenticatedUser();
  }, []);

  return (
    <div className="App">
      <SpaceBackground />

      <main className="content">
        <LoggedInUserContext.Provider value={loggedInUser}>
          <BrowserRouter>
            <Header updateUser={getAuthenticatedUser} />
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route
                path="login"
                element={<LoginPage updateUser={getAuthenticatedUser} />}
              />
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        </LoggedInUserContext.Provider>
      </main>
    </div>
  );
}

export default App;
