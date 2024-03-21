import React from "react";
import "./lateralMenu.css";
import logo from "../../images/nome_liras_rosa-removebg.png";

import { MdBorderColor } from "react-icons/md";
import { IoFileTrayStacked } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";

const LateralMenu = (props) => {
  const subir = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id={props.isOpen ? "lateralMenuAberto" : "lateralMenuFechado"}>
      <div id="containerBMenu">
        <img src={logo} alt="logo" />
      </div>
      <div id="containerOptions">
        <button
          id={!props.pedidosActive ? "bPedidosAtivo" : "bPedidos"}
          disabled={!props.pedidosActive ? true : false}
          onClick={() => {
            props.painel();
            props.isOpen && props.menu();
          }}
        >
          <MdBorderColor />
          {props.isOpen ? <span id="pedidos">Pedidos</span> : ""}
        </button>
        <button
          id={props.pedidosActive ? "bPedidosAtivo" : "bPedidos"}
          disabled={props.pedidosActive ? true : false}
          onClick={() => {
            props.painel();
            props.isOpen && props.menu();
          }}
        >
          <IoFileTrayStacked />

          {props.isOpen ? <span id="pedidos">Produtos</span> : ""}
        </button>
      </div>
      <button id="subirPage" onClick={() => subir()}>
        <FaChevronUp />
      </button>
    </div>
  );
};

export default LateralMenu;
