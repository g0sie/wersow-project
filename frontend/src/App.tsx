import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <section className="starsBg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </section>
      <main className="appMain">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
