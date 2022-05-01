import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Purchase from "./pages/Purchase";
import DailyTransaction from "./pages/DailyTransaction";
import Expense from "./pages/Expense";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/purchase" element={<Purchase />} />
        <Route exact path="/daily-transaction" element={<DailyTransaction />} />
        <Route exact path="/expenses" element={<Expense />} />
      </Routes>
    </Router>
  );
}

export default App;
