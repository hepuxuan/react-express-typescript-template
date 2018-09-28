import * as React from "react";
import { AppRoutes } from "./AppRoutes";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    __INITIAL_DATA__: any;
  }
}

const App: React.SFC = () => (
  <React.Fragment>
    <div>
      <Link to="/">news</Link>
      <Link to="/about">about</Link>
    </div>
    <div>
      <AppRoutes />
    </div>
  </React.Fragment>
);

export { App };
