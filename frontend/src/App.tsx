import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import "./App.css";

interface UserInterface {
  name: "string";
}

export const LoggedInUserContext = createContext<UserInterface | null>(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserInterface | null>(null);

  const getAuthenticatedUser = async () => {
    const response = await fetch(
      "https://wersow-api.herokuapp.com/users/user",
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (response.ok) {
      const user = await response.json();
      setLoggedInUser(user);
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return (
    <div className="App">
      <section className="starsBg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </section>
      <LoggedInUserContext.Provider value={loggedInUser}>
        <main className="appMain">
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
        </main>
      </LoggedInUserContext.Provider>
    </div>
  );
}

export default App;
