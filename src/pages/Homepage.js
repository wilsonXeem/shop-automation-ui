import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShopHomepage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [cost, setCost] = useState("");
  const url = "https://shopautomation.herokuapp.com/products/";
  // const url = "http://localhost:8000/products/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
      });
  }, []);
  function handleSubmit() {
    if (name !== "" && cost !== "" && qty !== "") {
      fetch("https://shopautomation.herokuapp.com/products/", {
        method: "POST",
        body: JSON.stringify({
          name: name.toLowerCase().trim(),
          unitCost: cost,
          quantity: qty,
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
    fetch(`https://shopautomation.herokuapp.com/products/${id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  } 
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Stock</h1>
      <hr />
      <div style={{ width: "100%" }}>
        <button className="btn" onClick={() => navigate("/daily-transaction")}>
          Sales
        </button>
        <button className="btn" onClick={() => navigate("/purchases")}>
          Purchases
        </button>
        <button className="btn" onClick={() => navigate("/expenses")}>
          Expenses
        </button>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit cost</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i} id={item._id}>
                  <td>
                    {i + 1}{" "}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="b"
                    >
                      X
                    </button>
                  </td>
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
                  type="number"
                  onChange={(e) => setCost(e.target.value)}
                  value={cost}
                  placeholder="Unit Cost"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>

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
  );
}

export default ShopHomepage;
