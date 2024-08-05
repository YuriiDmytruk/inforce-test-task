import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsList from "./components/ProductsList";
import ProductPage from "./components/ProductPage";


import { getAllProducts } from "./dataManager";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "./redux/ducks/products";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts().then((result) => dispatch(addProducts(result)))
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />}>
          <Route path="/card/:productId" element={<ProductPage />} />
          <Route path="*" element={<ProductsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
