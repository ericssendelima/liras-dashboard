import React, { useState } from "react";
import "./headerDash.css";
import logo from "../../images/Nova_logo_lira_s-removebg-preview.png";


import { HiMenuAlt2 } from "react-icons/hi";
import PopUpLogOut from "../popUpLogOut/PopUpLogOut";

const HeaderDash = ({ menu, checkLog }) => {
  const [popUpUser, setPopUpUser] = useState(false);
 

  const openPopUpUser = () => {
    setPopUpUser(!popUpUser)
  }
  return (
    <div id="headerDashContainer">
      <button id="bMenu" onClick={() => menu()}>
        <HiMenuAlt2 />
      </button>
      
        <button id="perfilLog" onClick={() => openPopUpUser()}>
          <img src={logo} alt="" style={{height: "25px"}}/>
          <div id="checkGreen"></div>
        </button>
        {popUpUser && <PopUpLogOut checkLog={checkLog} openPopUpUser={openPopUpUser}/>}
    </div>
  );
};

export default HeaderDash;
