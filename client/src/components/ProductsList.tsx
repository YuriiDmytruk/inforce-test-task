
import { useState } from 'react';
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { ProductType, RootState } from '../types';

import { Row, Container } from 'react-bootstrap';
import { addProduct } from '../redux/ducks/products';
import { addProductDB } from '../dataManager';
import ProductModal from './ProductModal';


const ProductsList = () => {
  const [show, setShow] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>({
    _id: '',
    imageURL: '',
    name: '',
    count: 0,
    size: {
      width: 0,
      height: 0
    },
    weight: 0,
    comments: []
  })

  const products = useSelector((state: RootState) => state.products.products);

  const dispatch = useDispatch();

  const saveProduct = () => {
    addProductDB(product).then((res) => { dispatch(addProduct(res)) })
    setProduct({
      _id: '',
      imageURL: '',
      name: '',
      count: 0,
      size: {
        width: 0,
        height: 0
      },
      weight: 0,
      comments: []
    })
  }

  return (
    <div>
      <button onClick={() => setShow(true)}>ADD</button>
      <ProductModal show={show} setShow={setShow} product={product} setProduct={setProduct} saveProduct={saveProduct} />
      <Container>
        <Row>
          {products.map((product: ProductType) => <ProductCard key={product._id} product={product} />)}
        </Row>
      </Container>
    </div>
  )
}

export default ProductsList