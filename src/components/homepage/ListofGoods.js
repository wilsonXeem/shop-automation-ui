import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

function ListofGoods() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState("");
  const url = "https://agroshopify.herokuapp.com/products/";
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
        setLoading(false);
      });
  }, []);
  async function addGood() {
    if (name !== "" && price !== "" && number !== "") {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          unitPrice: price,
          numberAvailable: number,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => window.location.reload())
        .catch((e) => console.log(e));
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>This is the list of Goods available</h1>
          <section className="listofgoods">
            {data.map((item, i) => {
              return (
                <div
                  className="good"
                  id={item._id}
                  key={i}
                  onClick={() => navigate(`/admin/salespage/${item._id}`)}
                >
                  <h1>{item.name}</h1>
                  <h3>
                    N
                    {String(item.unitPrice).length > 3
                      ? String(item.unitPrice).substring(
                          0,
                          String(item.unitPrice).length - 3
                        ) +
                        "," +
                        String(item.unitPrice).substring(
                          String(item.unitPrice).length - 3,
                          String(item.unitPrice).length
                        )
                      : String(item.unitPrice)}
                  </h3>
                  <h3>{item.numberAvailable} pcs available</h3>
                </div>
              );
            })}
            <div className="good new-good">
              <h3>Add new Product</h3>
              <h3>
                <input
                  type="text"
                  placeholder="Name of Good"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </h3>
              <h3>
                <input
                  type="text"
                  placeholder="Unit Price of Good"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </h3>
              <h3>
                <input
                  type="text"
                  placeholder="Number of Good Available"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                />
                <br />
              </h3>
              <button onClick={addGood}>ADD</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ListofGoods;
