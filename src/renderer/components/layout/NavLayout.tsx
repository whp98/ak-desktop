import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "@/renderer/components/router/Sidebar";

/** 导航页面布局 */
function NavLayout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

export default NavLayout;
