import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShopDailyTransaction() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const url = "https://agroshopify.herokuapp.com/products/";
  const url = "http://localhost:8000/sales/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.sales);
      });
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Daily Sales</h1>
        <hr />
        <div style={{ width: "100%" }}>
          <button className="btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i} onClick={() => navigate(`/salespage/${item._id}`)}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    N
                    {String(item.rate).length > 3
                      ? String(item.rate).substring(
                          0,
                          String(item.rate).length - 3
                        ) +
                        "," +
                        String(item.rate).substring(
                          String(item.rate).length - 3,
                          String(item.rate).length
                        )
                      : String(item.rate)}
                  </td>
                  <td>
                    N
                    {String(item.rate * item.quantity).length > 3
                      ? String(item.rate * item.quantity).substring(
                          0,
                          String(item.rate * item.quantity).length - 3
                        ) +
                        "," +
                        String(item.rate * item.quantity).substring(
                          String(item.rate * item.quantity).length - 3,
                          String(item.rate * item.quantity).length
                        )
                      : String(item.rate * item.quantity)}
                  </td>
                  <td>{item.remarks}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className="btn"
            style={{ width: "30%", height: "1.5rem", fontSize: "large" }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ShopDailyTransaction;
