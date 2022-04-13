import "./App.css";
import Homepage from "./pages/Homepage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Salespage from "./pages/Salespage";
import DailyTransactionpage from "./pages/DailyTransactionpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin" element={<Homepage />} />
        <Route exact path="/admin/salespage/:goodId" element={<Salespage />} />
        <Route exact path="/admin/daily-transaction" element={<DailyTransactionpage />} />
      </Routes>
    </Router>
  );
}

export default App;
