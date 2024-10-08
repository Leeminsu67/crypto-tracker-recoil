import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default Router;
