import cookieParser = require("cookie-parser");
import express = require("express");
import logger = require("morgan");
import path = require("path");

import indexRouter from "./routes";
import newsApiRouter from "./routes/newsApi";

const app = express();

// view engine setup
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "../../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const middleware = require("webpack-dev-middleware");
  const compiler = webpack(require("../../config/webpack.dev"));
  app.use(
    middleware(compiler, {
      publicPath: "/dist/"
    })
  );
}

app.use(express.static(path.join(__dirname, "../../public")));

app.use("/api/news", newsApiRouter);
app.use("/", indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // set locals, only providing error in development
    const message = err.message;
    const error = process.env.NODE_ENV === "Production" ? {} : err;

    // render the error page
    res.status(500);
    res.render("error", {
      error,
      message,
      status: 500
    });
  }
);

export default app;
