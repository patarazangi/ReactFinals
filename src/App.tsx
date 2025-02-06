import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/main/MainPage";
import HistoryPage from "./pages/histroy/HistoryPage";
import HowItWorksPage from "./pages/about/HowItWorksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<MainPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="howitworks" element={<HowItWorksPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
