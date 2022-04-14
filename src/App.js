import "./App.css";
import Homepage from "./pages/Homepage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Salespage from "./pages/Salespage";
import DailyTransactionpage from "./pages/DailyTransactionpage";
import ShopHomepage from "./pages/ShopHomepage";
import ShopSalespage from "./pages/ShopSalespage";
import ShopDailyTransaction from "./pages/ShopDailyTransaction";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin" element={<Homepage />} />
        <Route exact path="/" element={<ShopHomepage />} />
        <Route exact path="/admin/salespage/:goodId" element={<Salespage />} />
        <Route exact path="/salespage/:goodId" element={<ShopSalespage />} />
        <Route
          exact
          path="/admin/daily-transaction"
          element={<DailyTransactionpage />}
        />
        <Route
          exact
          path="/daily-transaction"
          element={<ShopDailyTransaction />}
        />
      </Routes>
    </Router>
  );
}

export default App;
