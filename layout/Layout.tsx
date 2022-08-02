import { ReactElement } from "react";
import React from "react";

import Menu from "../layout/Menu";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};
