import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [charges, setCharges] = useState("");
  const [salaries, setSalaries] = useState();
  const [others, setOthers] = useState("");
  // const url = "https://agroshopify.herokuapp.com/products/";
  const url = "https://agroshopify.herokuapp.com/expenses/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.expenses);
      });
  }, []);
  function handleSubmit() {
    fetch("https://agroshopify.herokuapp.com/expenses/", {
      method: "POST",
      body: JSON.stringify({
        charges: charges,
        salaries: salaries,
        others: others,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => window.location.reload());
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Expenses</h1>
      <hr />
      <div style={{ width: "100%" }}>
        <button className="btn" onClick={() => navigate("/")}>
          Stock
        </button>
        <button className="btn" onClick={() => navigate("/purchases")}>
          Purchases
        </button>
        <button className="btn" onClick={() => navigate("/daily-transaction")}>
          Sales
        </button>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Labour Charges</th>
              <th>Salaries</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    N
                    {String(item.charges).length > 3
                      ? String(item.charges).substring(
                          0,
                          String(item.charges).length - 3
                        ) +
                        "," +
                        String(item.charges).substring(
                          String(item.charges).length - 3,
                          String(item.charges).length
                        )
                      : String(item.charges)}
                  </td>
                  <td>
                    N
                    {String(item.salaries).length > 3
                      ? String(item.salaries).substring(
                          0,
                          String(item.salaries).length - 3
                        ) +
                        "," +
                        String(item.salaries).substring(
                          String(item.salaries).length - 3,
                          String(item.salaries).length
                        )
                      : String(item.salaries)}
                  </td>
                  <td>
                    N
                    {String(item.others).length > 3
                      ? String(item.others).substring(
                          0,
                          String(item.others).length - 3
                        ) +
                        "," +
                        String(item.others).substring(
                          String(item.others).length - 3,
                          String(item.others).length
                        )
                      : String(item.others)}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>
                <input
                  type="number"
                  onChange={(e) => setCharges(e.target.value)}
                  value={charges}
                  placeholder="Charges"
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={(e) => setSalaries(e.target.value)}
                  value={salaries}
                  placeholder="Salaries"
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setOthers(e.target.value)}
                  value={others}
                  placeholder="Others"
                />
              </td>
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

export default Expense;
