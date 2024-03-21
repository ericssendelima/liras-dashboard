import React, { useState } from "react";

import "./dashboard.css";
import LateralMenu from "../../components/menu-lateral/LateralMenu";
import HeaderDash from "../../components/headerDash/headerDash";
import OrderDash from "../../components/orderDash/OrderDash";
import ProductsDash from "../../components/productsDash/ProductsDash";

const Dashboard = ({checkLog}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pedidosActive, setPedidosActive] = useState(false);

  const menu = () => {
    setIsOpen(!isOpen);
  };

  const painel = () => {
    setPedidosActive(!pedidosActive);
  };
  return (
    <div id="dashboardContainer">
      <LateralMenu
        isOpen={isOpen}
        painel={painel}
        pedidosActive={pedidosActive}
        menu={menu}
      />
      <div id="bodyDash">
        <HeaderDash menu={menu} checkLog={checkLog}/>
        <div id="painelBodyDash">
          {pedidosActive ? <ProductsDash /> : <OrderDash />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
