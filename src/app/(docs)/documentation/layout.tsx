import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="pt-20">{children}</div>;
};

export default Layout;
