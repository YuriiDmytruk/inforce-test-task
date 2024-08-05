import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsList from "./components/ProductsList";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />}>
          <Route path="/card/:productId" element={<ProductCard />} />
          <Route path="*" element={<ProductsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
