import React, { useState } from "react";
import "./PopupEditProd.css";

import { IoClose } from "react-icons/io5";

import { ref, set, update } from "firebase/database";
import { db } from "../../firebase/config";


const PopupEditProd = ({ setIsAdding, prodAtual, isEditing, setIsEditing }) => {

  const [name, setName] = useState(isEditing?prodAtual.name:"");
  const [image, setImage] = useState(isEditing?prodAtual.image:"");
  const [preco, setPreco] = useState(isEditing?prodAtual.preco:"");
  const [estoque, setEstoque] = useState(isEditing?prodAtual.estoque:"");
  const [pPago, setPPago] = useState(isEditing?prodAtual.pPago:"");
  const [id, setId] = useState(isEditing?prodAtual.id:"");
  const [prodTotal, setProdTotal] = useState(isEditing?prodAtual.prodTotal:"");
  const quantidade = 1;


  const fechar = () => {
    setIsAdding(false);
    setIsEditing(false);
    setName("");
    setId("");
    setPreco("");
    setEstoque("");
    setPPago("");
    setImage("");
    setProdTotal("");
  };

  const confirmAddProd = () => {
    const id = Date.now();

    set(ref(db, `products/${id}`), {
      id,
      name,
      preco,
      quantidade,
      image,
      pPago,
      prodTotal: preco,
      estoque,
    }).catch((err) => alert("Acesso não permitido"));

    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
    fechar();

  };

  const confirmEditProd = () => {
    update(ref(db, `products/${id}`), {
      name,
      id,
      preco,
      estoque,
      pPago,
      image,
      prodTotal,
      quantidade,
    }).catch((err) => alert("Acesso não permitido"));
    fechar();
  };

  

  return (
    <div id="PopupEditProdContainer">
      <div id="headerPopupAddProd">
        <h3>Informações do Produto</h3>
        <button id="fecharPopupAddProd" onClick={() => fechar()}>
          <IoClose />
        </button>
      </div>

      <div id="prodInfoContainer">
        <div id="one">
          <label>
            Nome
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label>
            Imagem URL
            <input
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </label>
        </div>
        <div id="two">
          <label>
            Preço
            <input
              type="number"
              value={preco}
              onChange={(e) => {
                setPreco(parseFloat(e.target.value));
                setProdTotal(parseFloat(e.target.value));
              }}
            />
          </label>
          <label>
            Estoque
            <input
              type="number"
              value={estoque}
              onChange={(e) => {
                setEstoque(parseInt(e.target.value));
              }}
            />
          </label>
        </div>
        <div id="three">
          <label>
            PPG
            <input
              type="number"
              value={pPago}
              onChange={(e) => {
                setPPago(parseFloat(e.target.value));
              }}
            />
          </label>
          <label>
            Categoria
            <select>
              <option>Selecione a categoria</option>
              <option>Categoria 01</option>
              <option>Categoria 02</option>
              <option>Categoria 03</option>
            </select>
          </label>
        </div>
        <div id="four">
          <button id="cancelAddProd" onClick={() => fechar()}>
            Cancelar
          </button>
          {isEditing ? (
            <button id="confirmAddProd" onClick={() => confirmEditProd()}>
              Atualizar
            </button>
          ) : (
            <button id="confirmAddProd" onClick={() => confirmAddProd()}>
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupEditProd;
