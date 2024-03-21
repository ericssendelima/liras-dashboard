import React, { useState, useEffect } from "react";
import "./ProductsDash.css";

// import { ref, set, onValue, remove, update } from "firebase/database";
import { ref, onValue } from "firebase/database";

import { db } from "../../firebase/config";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { VscGithubAction } from "react-icons/vsc";
import { BsDatabaseCheck } from "react-icons/bs";
import { BsFillImageFill } from "react-icons/bs";

import PopupEditProd from "../popupEditProd/PopupEditProd";
import PopupBin from "../popupBin/PopupBin";

const ProductsDash = () => {
  

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  

  const [isShown, setIsShown] = useState(false);
  // let prodAtual = {};
  const [prodAtual, setProdAtual] = useState({});

  const [listaProdutos, setListaProdutos] = useState([]);

  //READ

  useEffect(() => {
    onValue(
      ref(db, `products/`),
      (snapshot) => {
        setListaProdutos([]);
        const data = snapshot.val();

        if (data !== null) {
          setListaProdutos([...Object.values(data)]);
        } else {
          setListaProdutos([]);
        }
      },
      (error) => console.log(error)
    );
  }, []);



  const AddProd = () => {
    setIsAdding(!isAdding);
  };

  const showLegend = () => {
    setIsShown(!isShown);
  };

  const update = (prod) => {
    setIsAdding(!isAdding);
    setIsEditing(!isEditing);
    setProdAtual(prod);
  };

  //DELETE
  const deletar = (prod) => {
    setIsDeleting(!isDeleting);
    setProdAtual(prod);

   };

  return (
    <div id="ProductsDashContainer">
      <div id="headerProdsDash">
        <h2>Produtos</h2>
        <button id="addProd" onClick={() => AddProd()}>
          Add
        </button>
      </div>

      {isAdding && (
        <PopupEditProd
          setIsAdding={setIsAdding}
          prodAtual={prodAtual}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
      <div id="expoProds">
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
              <BsFillImageFill />
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
              onClick={() => showLegend()}
            >
              {isShown ? "Est" : <BsDatabaseCheck />}
            </div>
            <div
              style={{
                width: "5%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
              }}
              onClick={() => showLegend()}
            >
              {isShown ? "Act" : <VscGithubAction />}
            </div>
          </div>
          {listaProdutos.length > 0 ? (
            listaProdutos.map((prod) => (
              <li className="lista" key={prod.id}>
                <div id="c1">
                  <p>{prod.name}</p>
                </div>
                <div id="c2">
                  <img src={prod.image} alt="" />
                </div>

                <div id="c3">
                  <p>
                    <span>{parseFloat(prod.preco).toFixed(2)}</span>
                  </p>
                </div>
                <div id="c4">
                  <p>{parseFloat(prod.pPago).toFixed(2)}</p>
                </div>
                <div id="c5">
                  <p>
                    <span>{prod.estoque}</span>
                  </p>
                </div>
                {isDeleting && <PopupBin prodAtual={prodAtual} setIsDeleting={setIsDeleting} isDeleting={isDeleting}/>}

                <div id="c6" className="buttons">
                  <button id="actButtons" onClick={() => update(prod)}>
                    <TbEdit />
                  </button>
                  <button id="actButtons" style={{ color: "red" }} onClick={() => deletar(prod)}>
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Adicione um produto</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductsDash;
