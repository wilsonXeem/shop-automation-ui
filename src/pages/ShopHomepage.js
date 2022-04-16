import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ShopCurrentDate from "../components/ShopCurrentDate";

function ShopHomepage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
  return (
    <div style={{ textAlign: "center" }}>
      <ShopCurrentDate />
      <hr />
      <h1>This is the list of Goods available</h1>
      {loading ? (
        <Loading />
      ) : (
        <section className="listofgoods">
          {data.map((item, i) => {
            return (
              <div
                className="good"
                id={item._id}
                key={i}
                onClick={() => navigate(`/salespage/${item._id}`)}
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
        </section>
      )}
    </div>
  );
}

export default ShopHomepage;
