import React from "react";
import CurrentDate from "../components/homepage/CurrentDate";
import ListofGoods from "../components/homepage/ListofGoods";


function Homepage() {
  return (
    <>
      <div className="home">
        <CurrentDate />
        <hr />
        <ListofGoods />
      </div>
    </>
  );
}

export default Homepage;
