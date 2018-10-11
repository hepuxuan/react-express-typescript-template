import express = require("express");
import * as React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { App } from "../../common/App";
import { StaticRouter, matchPath, StaticRouterContext } from "react-router";
import { router as clientRouter } from "../../common/route";
import serialize from "serialize-javascript";
import { getChunkHash } from "../chunkHash";
import { router as appRoutes } from "../../common/route";

const router = express.Router();

appRoutes.map(route => {
  router.get(
    route.path,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const activeRoute = clientRouter.find(
        ({ path }) =>
          !!matchPath(req.url, {
            path,
            exact: true,
            strict: false
          })
      );

      activeRoute
        .getInitialData(
          matchPath(req.url, {
            path: activeRoute.path,
            exact: true,
            strict: false
          })
        )
        .then(data => {
          const reactBody = renderToString(
            <StaticRouter
              location={req.url}
              context={{ data } as StaticRouterContext}
            >
              <App />
            </StaticRouter>
          );
          const sheet = new ServerStyleSheet();
          const styles = sheet.getStyleTags();

          res.render("index", {
            title: "Express",
            reactBody,
            styles,
            appHash: getChunkHash("app"),
            vendorHash: getChunkHash("vendors"),
            serverData: serialize(data)
          });
        });
    }
  );
});

export default router;
