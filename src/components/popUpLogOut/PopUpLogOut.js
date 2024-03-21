import React from "react";
import "./PopUpLogOut.css";

import { TbLogout2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

import { getAuth, signOut } from "firebase/auth";


const PopUpLogOut = ({ openPopUpUser, checkLog }) => {
  const auth = getAuth();
  
  
  const sair = () => {
    signOut(auth)
      .then(() => {
        checkLog()
      })
      .catch((error) => {
        alert(error);
      });
  };
  
  return (
    <div id="PopUpLogOutContainer">
      <div id="popuphuserheader">
        <div id="userPopUpInfo">
          <h4>Lira's Cosméticos</h4>
          <p>cosmeticosliras@gmail.com</p>
        </div>
        <button onClick={() => openPopUpUser()}><IoClose/></button>
      </div>

      <div id="signout">
        <button id="logout" onClick={()=>sair()}>
          <TbLogout2 />
          <span>SignOut</span>
        </button>
      </div>
    </div>
  );
};

export default PopUpLogOut;
