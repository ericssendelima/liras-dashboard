import React from "react";
import "./PopupBin.css";
import { ref, remove } from "firebase/database";
import { db } from "../../firebase/config";


const PopupBin = ({ isDeleting, setIsDeleting, prodAtual }) => {
  //CONFIRM DELETE
  const confirmDestroyProd = (id) => {
    remove(ref(db, `products/${id}`)).catch((err) =>
      alert("Acesso não permitido")
    );
    setIsDeleting(!isDeleting);
  };

  const fechar = () => {
    setIsDeleting(!isDeleting);
  };

  return (
    <div id="popupBinContainer">
      <div id="textBin">
        <p>Quer mesmo excluir {prodAtual.name}?</p>
      </div>
      <div id="buttonsConfirmBin">
        <button id="cancelDestroyProd" onClick={() => fechar()}>
          Cancelar
        </button>
        <button
          id="confirmDestroyProd"
          onClick={() => confirmDestroyProd(prodAtual.id)}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default PopupBin;
