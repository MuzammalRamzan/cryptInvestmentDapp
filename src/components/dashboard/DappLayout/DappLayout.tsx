import React from "react";
import Header from "../DappHeader";
import LeftSidebar from "../LeftSidebar";

const DappLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-row bg-dashboard-dark-purple">
      <LeftSidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Header />
        <main className="py-6 px-4 md:py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DappLayout;
