import React, { useState, useEffect } from "react";

import { ref, onValue } from "firebase/database";

import { db } from "../../firebase/config";

import "./OrderDash.css";

const OrderDash = () => {
  const [listaProdutos, setListaProdutos] = useState([]);

  //READ

  useEffect(() => {
    onValue(
      ref(db, `orders/`),
      (snapshot) => {
        setListaProdutos([]);
        const data = snapshot.val();

        if (data !== null) {
          setListaProdutos([...Object.values(data)]);
          console.log(listaProdutos)
        } else {
          setListaProdutos([]);
        }
      },
      (error) => console.log(error)
    );
  }, []);
  return (
    <div id="OrderDashContainer">
      <div id="headerOrdersDash">Hearder</div>
      <div id="expoOrders">
        <ul>
          <div
            id="titulosTable"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Nome
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              teste
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              R$
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              PPG
            </div>
            <div
              style={{
                width: "5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              teste
            </div>
            <div
              style={{
                width: "5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
              }}
            >
              test
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default OrderDash;
