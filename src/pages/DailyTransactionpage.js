import React, { useState, useEffect } from "react";

function DailyTransactionpage() {
  const [data, setData] = useState([]);
  const [added, setAdded] = useState([]);
  const [sold, setSold] = useState([]);
  const [returned, setReturned] = useState([]);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const d = new Date().toLocaleDateString("en-US", options);
  const url = "http://localhost:8000/products/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.products));
  }, []);
  function handleClick() {
    const mapped = data.map((x) => x.transactionHistory);
    const added = mapped.map((x) => x.added);
    const sold = mapped.map((x) => x.sold);
    const returned = mapped.map((x) => x.returned);
    setAdded(added);
    setSold(sold);
    setReturned(returned);
      console.log(mapped, sold, returned);
  }
  return (
    <>
      <h1>Daily Transactions</h1>
      <button onClick={handleClick}>Show daily transactions</button>
      <div>
        <h2>Added stock</h2>
        {added.map((x) => {
          return x.map((y, i) => {
            if (y.dateAdded === d) {
              return (
                <p key={i}>
                  {y.dateAdded}-- <b>{y.amount}Pcs</b> at {y.timeAdded}
                </p>
              );
            }
          });
        })}
      </div>
      <div>
        <h2>Sold stock</h2>
        {sold.map((x) =>
          x.map((y, i) => {
            if (y.dateSold === d) {
              return (
                <p key={i}>
                  {y.dateSold}-- <b>{y.amount}Pcs</b> at {y.timeSold}
                </p>
              );
            }
          })
        )}
      </div>
      <div>
        <h2>Returned stock</h2>
        {returned.map((x) => {
          return x.map((y, i) => {
            if (y.dateReturned === d) {
              return (
                <p key={i}>
                  {y.dateReturned}-- <b>{y.amount}Pcs</b> at {y.timeReturned}
                </p>
              );
            }
          });
        })}
      </div>
    </>
  );
}

export default DailyTransactionpage;
