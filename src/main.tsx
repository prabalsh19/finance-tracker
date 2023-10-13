import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Income } from "./pages/Income.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Expense } from "./pages/Expense.tsx";
import { Savings } from "./pages/Savings.tsx";
import { AddEntry } from "./pages/AddEntry.tsx";
import { Report } from "./pages/Report.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Income /> },
      { path: "/expense", element: <Expense /> },
      { path: "/savings", element: <Savings /> },
      { path: "/add", element: <AddEntry /> },
      { path: "/report", element: <Report /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
