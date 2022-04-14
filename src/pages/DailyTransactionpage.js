import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DailyTransactionpage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [added, setAdded] = useState([]);
  const [sold, setSold] = useState([]);
  const [returned, setReturned] = useState([]);
  const [totalSale, setSale] = useState("");
  const url = "https://agroshopify.herokuapp.com/products/transactions";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.products));
  }, []);
  function handleClick() {
    const addedProduct = data.map((x) => x.added);
    const soldProduct = data.map((x) => x.sold);
    const returnedProduct = data.map((x) => x.returned);
    const sale = data.map((x) => x.totalSale);
    setAdded(addedProduct);
    setSold(soldProduct);
    setReturned(returnedProduct);
    setSale(sale.reduce((x, y) => x + y).toString());
  }

  return (
    <>
      <h1>Daily Transactions</h1>
      <button className="btn" onClick={handleClick}>
        Show daily transactions
      </button>
      <div className="trr">
        <h2 style={{ color: "green", marginBottom: "0px" }}>Added stock</h2>
        {added.map((x) => {
          return x.map((y, i) => {
            return (
              <p style={{ margin: "2px" }} key={i}>
                <b>~ {y.amount}Pcs</b> of <b>{y.name}</b> {y.remark}
              </p>
            );
          });
        })}
      </div>
      <div className="trr">
        <h2 style={{ color: "red", marginBottom: "0px" }}>Sold stock</h2>
        {sold.map((x) =>
          x.map((y, i) => {
            return (
              <p style={{ margin: "2px" }} key={i}>
                <b>~ {y.amount}Pcs</b> of <b>{y.name}</b> {y.remark}
              </p>
            );
          })
        )}
        <h3 style={{ marginBottom: "0px" }}>
          Total Sale: N
          {totalSale.length > 3
            ? totalSale.substring(0, totalSale.length - 3) +
              "," +
              totalSale.substring(totalSale.length - 3, totalSale.length)
            : totalSale}
        </h3>
      </div>
      <div className="trr">
        <h2 style={{ color: "orange", marginBottom: "0px" }}>Returned stock</h2>
        {returned.map((x) => {
          return x.map((y, i) => {
            return (
              <p style={{ margin: "2px" }} key={i}>
                <b>~ {y.amount}Pcs</b> of <b>{y.name}</b> {y.remark}
              </p>
            );
          });
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button className="btn" onClick={() => navigate("/admin")}>
          Back to Home
        </button>
      </div>
    </>
  );
}

export default DailyTransactionpage;
