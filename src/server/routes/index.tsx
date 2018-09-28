import express = require("express");
import * as React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { App } from "../../common/App";
import { StaticRouter, matchPath, StaticRouterContext } from "react-router";
import { router as clientRouter } from "../../common/route";
import serialize from "serialize-javascript";

const router = express.Router();

router.get(
  "/**",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const activeRoute = clientRouter.find(
      ({ path }) =>
        !!matchPath(req.url, {
          path,
          exact: true,
          strict: false
        })
    );

    activeRoute.getInitialData().then(data => {
      const sheet = new ServerStyleSheet();
      const styles = sheet.getStyleTags();

      const reactBody = renderToString(
        <StaticRouter
          location={req.url}
          context={{ data } as StaticRouterContext}
        >
          <App />
        </StaticRouter>
      );
      res.render("index", {
        title: "Express",
        reactBody,
        styles,
        hash: "dev",
        serverData: serialize(data)
      });
    });
  }
);

export default router;
