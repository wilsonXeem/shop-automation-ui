import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function Salespage() {
  const navigate = useNavigate();
  const [good, setGood] = useState({});
  const [addedd, setAddedd] = useState([]);
  const [returne, setReturne] = useState([]);
  const [soldd, setSoldd] = useState([]);
  const [loading, setLoading] = useState(false);
  const { goodId } = useParams();
  const [add, setAdd] = useState("");
  const [returnn, setReturnn] = useState("");
  const [sale, setSale] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [goodId]);
  async function fetchData() {
    await fetch(`http://localhost:8000/products/${goodId}`)
      .then((response) => response.json())
      .then((json) => {
        setGood(json);
        setLoading(false);
      })
      .catch((e) => setLoading(true));
  }

  async function deleteGood() {
    await fetch(`http://localhost:8000/products/${goodId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => navigate("/admin"))
      .catch((e) => setLoading(true));
  }
  function handleClick() {
    setAddedd(good.transactionHistory.added);
    setReturne(good.transactionHistory.returned);
    setSoldd(good.transactionHistory.sold);
  }

  async function addGood() {
    await fetch(`http://localhost:8000/products/${goodId}/added`, {
      method: "POST",
      body: JSON.stringify({
        added: add,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  async function returnGood() {
    await fetch(`http://localhost:8000/products/${goodId}/returned`, {
      method: "POST",
      body: JSON.stringify({
        returned: returnn,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  async function soldGood() {
    await fetch(`http://localhost:8000/products/${goodId}/sold`, {
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

  async function editName() {
    await fetch(`http://localhost:8000/products/${goodId}/name`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  async function editPrice() {
    await fetch(`http://localhost:8000/products/${goodId}/price`, {
      method: "PATCH",
      body: JSON.stringify({
        unitPrice: price,
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
          <h1 style={{ textTransform: "uppercase" }}>
            {good.name}{" "}
            <input
              type="text"
              placeholder="Edit Name of Good"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />{" "}
            <button className="btn" onClick={editName}>
              Change
            </button>
          </h1>
          <hr />
          <section className="good-sec">
            <div className="good-des">
              <div>
                <button
                  style={{ background: "red" }}
                  className="btn"
                  onClick={deleteGood}
                >
                  Delete Product
                </button>
              </div>
              <h3>Total stock available:{good.numberAvailable} </h3>
              <h3>
                Total price available: N{good.numberAvailable * good.unitPrice}
              </h3>
              <h3>
                Unit Price: N{good.unitPrice}{" "}
                <input
                  type="text"
                  placeholder="Edit Unit Price of Good"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />{" "}
                <button className="btn" onClick={editPrice}>
                  Change
                </button>
              </h3>
              <div className="inp">
                Number of Products to add:{" "}
                <input
                  type="number"
                  id="addbtn"
                  onChange={(e) => setAdd(e.target.value)}
                  value={add}
                />
                <button onClick={addGood}>ADD</button>
              </div>
              <div className="inp">
                Number of Products to return:{" "}
                <input
                  type="number"
                  id="returnbtn"
                  onChange={(e) => setReturnn(e.target.value)}
                  value={returnn}
                />
                <button onClick={returnGood}>RETURN</button>
              </div>
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
        <button className="btn" onClick={() => navigate("/admin")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Salespage;
// const {} = useContext(ValueContext) import {ValueContext}
