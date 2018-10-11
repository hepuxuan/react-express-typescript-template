import { match as Match } from "react-router";
import { About } from "./components/About";
import { Index } from "./components/Index";
import { getNews } from "./services/newsService";
import { Loader } from "./components/Loader";

interface IRoute {
  component: React.ComponentType;
  path: string;
  getInitialData(match: Match): Promise<any>;
  loader: React.ComponentType;
}

const router: IRoute[] = [
  {
    component: About,
    path: "/about",
    getInitialData(match: Match) {
      return Promise.resolve({});
    },
    loader: Loader
  },
  {
    component: Index,
    path: "/",
    getInitialData(match: Match) {
      return getNews();
    },
    loader: Loader
  }
];

export { router };
