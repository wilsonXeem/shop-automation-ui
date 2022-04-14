import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopCurrentDate from "../components/ShopCurrentDate";

function ShopHomepage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const url = "http://localhost:8000/products/";
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.products));
  }, []);
  return (
    <div style={{textAlign:"center"}}>
      <ShopCurrentDate />
      <hr />
      <h1>This is the list of Goods available</h1>
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
              <h3>N{item.unitPrice}</h3>
              <h3>{item.numberAvailable} pcs available</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default ShopHomepage;
