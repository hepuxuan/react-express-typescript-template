import { getNews as getNewsClient } from "../../client/clients/newsClient";
import { getNews as getNewsServer } from "../../server/services/newsService";
import { INews } from "../models/news";

function getNews(): Promise<INews[]> {
  if (process.env.IS_BROWSER) {
    return getNewsClient();
  } else {
    return getNewsServer();
  }
}

export { getNews };
