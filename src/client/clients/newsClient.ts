import { INews } from "../../common/models/news";

async function getNews(): Promise<INews[]> {
  const res = await fetch("/api/news");
  const news = await res.json();
  return news.news;
}

export { getNews };
