import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Purchase() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState();
  const [cost, setCost] = useState("");
  const purchases = data.filter(
    (x) => x.time === new Date().toLocaleDateString()
  );
  // const url = "https://agroshopify.herokuapp.com/products/";
  const url = "http://localhost:8000/purchases/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.purchases);
      });
  }, []);
  function handleSubmit() {
    fetch("http://localhost:8000/purchases/", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        unitCost: cost,
        quantity: qty,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => window.location.reload());
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Purchases</h1>
        <hr />
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit cost</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchases.filter((item, i) => {
              return (
                <tr key={i} onClick={() => navigate(`/salespage/${item._id}`)}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    N
                    {String(item.unitCost).length > 3
                      ? String(item.unitCost).substring(
                          0,
                          String(item.unitCost).length - 3
                        ) +
                        "," +
                        String(item.unitCost).substring(
                          String(item.unitCost).length - 3,
                          String(item.unitCost).length
                        )
                      : String(item.unitCost)}
                  </td>
                  <td>
                    N
                    {String(item.unitCost * item.quantity).length > 3
                      ? String(item.unitCost * item.quantity).substring(
                          0,
                          String(item.unitCost * item.quantity).length - 3
                        ) +
                        "," +
                        String(item.unitCost * item.quantity).substring(
                          String(item.unitCost * item.quantity).length - 3,
                          String(item.unitCost * item.quantity).length
                        )
                      : String(item.unitCost * item.quantity)}
                  </td>
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
                  type="number"
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                  placeholder="Quantity"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setCost(e.target.value)}
                  value={cost}
                  placeholder="Unit Cost"
                />
              </td>
              <td></td>
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

export default Purchase;
