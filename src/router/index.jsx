import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import OcrPage from "../pages/OcrPage";
import ApiHubPage from "../pages/ApiHubPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <OcrPage />,
      },
      {
        path: "api-hub",
        element: <ApiHubPage />,
      },
    ],
  },
]);
