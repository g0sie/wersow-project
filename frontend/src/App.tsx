import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import IndexPage from "./pages/IndexPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
