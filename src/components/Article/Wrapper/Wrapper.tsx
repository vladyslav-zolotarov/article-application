import React, { ReactNode } from "react";

export const Wrapper = ({
  children,
  classList,
}: {
  children: ReactNode;
  classList?: string;
}) => {
  return <div className={classList}>{children}</div>;
};
