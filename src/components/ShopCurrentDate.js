import React from 'react'
import { useNavigate } from "react-router-dom";

function ShopCurrentDate() {
    const navigate = useNavigate();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let today = `${new Date().getDay()}`;
    let todaysDate = `${new Date().toLocaleDateString()}`;
    return (
      <>
        <h1>
          {days[today]}, {todaysDate}
        </h1>
        <button
          className="btn"
          onClick={() => navigate("/daily-transaction")}
        >
          View today's transactions
        </button>
      </>
    );
}

export default ShopCurrentDate
