import React, { useState } from "react";
import "./PopupEditProd.css";

import { IoClose } from "react-icons/io5";

import { ref, set, update } from "firebase/database";
import { db } from "../../firebase/config";
import 'dotenv/config';
const PopupEditProd = ({ setIsAdding, prodAtual, isEditing, setIsEditing }) => {
  const [name, setName] = useState(isEditing ? prodAtual.name : "");
  const [image, setImage] = useState(isEditing ? prodAtual.image : "");
  const [preco, setPreco] = useState(isEditing ? prodAtual.preco : "");
  const [estoque, setEstoque] = useState(isEditing ? prodAtual.estoque : "");
  const [pPago, setPPago] = useState(isEditing ? prodAtual.pPago : "");
  const [id, setId] = useState(isEditing ? prodAtual.id : "");
  const [prodTotal, setProdTotal] = useState(
    isEditing ? prodAtual.prodTotal : ""
  );
  const [descricao, setDescricao] = useState(
    isEditing ? prodAtual.descricao : ""
  );
  const [categoria, setCategoria] = useState(
    isEditing ? prodAtual.categoria : ""
  );

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
    setDescricao("");
    setCategoria("");
  };

  const confirmAddProd = () => {
    const id = Date.now();

    set(ref(db, `${process.env.REACT_APP_PERM_ED}/products/${id}`), {
      id,
      name,
      preco,
      quantidade,
      image,
      pPago,
      prodTotal: preco,
      estoque,
      categoria,
      descricao,
    }).catch((err) => alert("Acesso não permitido"));

    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "instant",
    });
    fechar();
  };

  const confirmEditProd = () => {
    update(ref(db, `${process.env.REACT_APP_PERM_ED}/products/${id}`), {
      name,
      id,
      preco,
      estoque,
      pPago,
      image,
      prodTotal,
      quantidade,
      categoria,
      descricao,
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
            <select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
              <option value="">Selecione a categoria</option>
              <option value="Hidratante facial">Hidratante facial</option>
              <option value="Limpeza facial">Limpeza facial</option>
              <option value="Sabonete facial">Sabonete facial</option>
              <option value="Gel facial">Gel facial</option>
              <option value="Sérum">Sérum</option>
              <option value="Protetor solar">Protetor solar</option>
              <option value="Argila">Argila</option>
              <option value="Máscara facial">Máscara facial</option>
              <option value="Sobrancelhas">Sobrancelhas</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Maquiagem">Maquiagem</option>
              <option value="MãosEPés">Mãos e Pés</option>
              <option value="Escova">Escova</option>
            </select>
          </label>
        </div>
        <div id="threedotfive">
          <label>
            Descrição
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
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
