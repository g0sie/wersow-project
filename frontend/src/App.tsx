import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpaceBackground from "./components/SpaceBackground/SpaceBackground";
import Header from "./components/Header/Header";

import IndexPage from "./pages/IndexPage/IndexPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyVideosPage from "./pages/MyVideosPage/MyVideosPage";

import "./App.css";
import useLoggedInUser from "./hooks/queries/useLoggedInUser";

function App() {
  const { data: user } = useLoggedInUser();

  return (
    <div className="App">
      <SpaceBackground />

      <main className="content">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            {!!user && <Route path="videos" element={<MyVideosPage />} />}
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
