import React from "react";

function CurrentDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
    let today = `${new Date().getDay()}`;
    let todaysDate = `${new Date().toLocaleDateString()}`
    return <h1>{days[today]}, { todaysDate}</h1>;
}

export default CurrentDate;
