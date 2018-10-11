import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { router } from "./route";
import { AsyncRoute } from "./components/AsyncRoute";
import { StaticContext, RouteComponentProps } from "react-router";

const AppRoutes: React.SFC = () => (
  <Switch>
    {router.map(({ component, path, getInitialData, loader }) => (
      <Route
        key={path}
        path={path}
        render={({
          staticContext,
          ...props
        }: {
          staticContext?: StaticContext;
        } & RouteComponentProps) => {
          return (
            <AsyncRoute
              component={component}
              getData={getInitialData}
              staticContext={staticContext}
              loader={loader}
              {...props}
            />
          );
        }}
      />
    ))}
  </Switch>
);

export { AppRoutes };
