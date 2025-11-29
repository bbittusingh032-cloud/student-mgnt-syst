import React from "react";

const Router = ({ children, currentPage }) => {
  return React.Children.toArray(children).find((child) => child.props.path === currentPage) || null;
};

export default Router;
