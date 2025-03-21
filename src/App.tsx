import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

// подгружает когда это необходимо, когда шелкнещь на корзину
const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));

function App() {
  return (
    //
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    //
  );
}

export default App;
