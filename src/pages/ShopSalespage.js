import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function ShopSalespage() {
  const navigate = useNavigate();
  const [good, setGood] = useState({});
  const [addedd, setAddedd] = useState([]);
  const [returne, setReturne] = useState([]);
  const [soldd, setSoldd] = useState([]);
  const [loading, setLoading] = useState(false);
  const { goodId } = useParams();
  const [sale, setSale] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [goodId]);
  async function fetchData() {
    await fetch(`https://agroshopify.herokuapp.com/products/${goodId}`)
      .then((response) => response.json())
      .then((json) => {
        setGood(json);
        setLoading(false);
      })
      .catch((e) => setLoading(true));
  }

  function handleClick() {
    setAddedd(good.transactionHistory.added);
    setReturne(good.transactionHistory.returned);
    setSoldd(good.transactionHistory.sold);
  }
  async function soldGood() {
    await fetch(`https://agroshopify.herokuapp.com/products/${goodId}/sold`, {
      method: "POST",
      body: JSON.stringify({
        sold: sale,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  return (
    <div className="sales">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 style={{ textTransform: "uppercase" }}>{good.name}</h1>
          <hr />
          <section className="good-sec">
            <div className="good-des">
              <h3>Total stock available:{good.numberAvailable} </h3>
              <h3>
                Total price available: N
                {String(good.numberAvailable * good.unitPrice).length > 3
                  ? String(good.numberAvailable * good.unitPrice).substring(
                      0,
                      String(good.numberAvailable * good.unitPrice).length - 3
                    ) +
                    "," +
                    String(good.numberAvailable * good.unitPrice).substring(
                      String(good.numberAvailable * good.unitPrice).length - 3,
                      String(good.numberAvailable * good.unitPrice).length
                    )
                  : String(good.numberAvailable * good.unitPrice)}
              </h3>
              <h3>
                Unit Price: N
                {String(good.unitPrice).length > 3
                  ? String(good.unitPrice).substring(
                      0,
                      String(good.unitPrice).length - 3
                    ) +
                    "," +
                    String(good.unitPrice).substring(
                      String(good.unitPrice).length - 3,
                      String(good.unitPrice).length
                    )
                  : String(good.unitPrice)}
              </h3>

              <div className="inp">
                Number of Products sold:{" "}
                <input
                  type="number"
                  id="salebtn"
                  onChange={(e) => setSale(e.target.value)}
                  value={sale}
                />
                <button onClick={soldGood}>SOLD</button>
              </div>
            </div>
            <div className="good-trans">
              <h1>Product Transaction History</h1>
              <button onClick={handleClick}>Click to view good history</button>
              <div className="added">
                <h3 style={{ color: "green", marginBottom: "0px" }}>
                  Products Added:
                </h3>
                {addedd.map((item, i) => {
                  return (
                    <p style={{ margin: "2px" }} key={i}>
                      {item.dateAdded}-- <b>{item.amount}pcs</b>
                    </p>
                  );
                })}
              </div>
              <div className="sold">
                <h3 style={{ color: "red", marginBottom: "0px" }}>
                  Products Sold:
                </h3>
                {soldd.map((item, i) => {
                  return (
                    <p style={{ margin: "2px" }} key={i}>
                      {item.dateSold}-- <b>{item.amount}pcs</b>
                    </p>
                  );
                })}
              </div>
              <div className="returned">
                <h3 style={{ color: "orange", marginBottom: "0px" }}>
                  Products Returned:
                </h3>
                {returne.map((item, i) => {
                  return (
                    <p style={{ margin: "2px" }} key={i}>
                      {item.dateReturned}-- <b>{item.amount}pcs</b>
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button className="btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ShopSalespage;
