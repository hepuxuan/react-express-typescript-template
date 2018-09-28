import { About } from "./components/About";
import { Index } from "./components/Index";
import { getNews } from "./services/newsService";
import { Loader } from "./components/Loader";

interface IRoute {
  component: React.ComponentType;
  path: string;
  getInitialData(): Promise<any>;
  loader: React.ComponentType;
}

const router: IRoute[] = [
  {
    component: About,
    path: "/about",
    getInitialData() {
      return Promise.resolve({});
    },
    loader: Loader
  },
  {
    component: Index,
    path: "/",
    getInitialData() {
      return getNews();
    },
    loader: Loader
  }
];

export { router };
