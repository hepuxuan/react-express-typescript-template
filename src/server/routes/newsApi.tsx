import express = require("express");
import { getNews } from "../services/newsService";
const router = express.Router();

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    getNews().then(news => {
      res.json({
        news
      });
    });
  }
);

export default router;
