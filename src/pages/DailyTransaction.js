import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShopDailyTransaction() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [remarks, setRemarks] = useState("");
  // const url = "https://agroshopify.herokuapp.com/products/";
  const url = "https://agroshopify.herokuapp.com/sales/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.sales);
      });
  }, []);
  function handleSubmit() {
    if (name !== "" && qty !== "" && rate !== "" && remarks !== "") {
      fetch("https://agroshopify.herokuapp.com/sales/", {
        method: "POST",
        body: JSON.stringify({
          name: name.toLowerCase(),
          rate: rate,
          quantity: qty,
          remarks: remarks,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => window.location.reload());
    } else {
      alert("Fields must not be empty");
    }
  }
  function handleDelete(id) {
    fetch(`https://agroshopify.herokuapp.com/sales/${id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  } 
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Daily Sales</h1>
        <hr />
        <div style={{ width: "100%" }}>
          <button className="btn" onClick={() => navigate("/")}>
            Stock
          </button>
          <button className="btn" onClick={() => navigate("/purchases")}>
            Purchases
          </button>
          <button className="btn" onClick={() => navigate("/expenses")}>
            Expenses
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
                <tr key={i} id={item._id}>
                  <td>
                    {i + 1}
                    <button
                      className="b"
                      onClick={() => handleDelete(item._id)}
                    >
                      X
                    </button>
                  </td>
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
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  placeholder="Quantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setRate(e.target.value)}
                  value={rate}
                  placeholder="Rate"
                />
              </td>
              <td></td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setRemarks(e.target.value)}
                  value={remarks}
                  placeholder="Remarks"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className="btn"
            onClick={handleSubmit}
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
