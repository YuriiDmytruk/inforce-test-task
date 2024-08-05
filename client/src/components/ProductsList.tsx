import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { ProductType, RootState } from '../types';

import { Row, Container } from 'react-bootstrap';
import { addProduct } from '../redux/ducks/products';
import { addProductDB } from '../dataManager';

const ProductsList = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const dispatch = useDispatch();

  const addButtonClickHandler = () => {
    const testProduct = {
      _id: '',
      imageURL: 'string',
      name: 'string',
      count: 0,
      size: {
        width: 0,
        height: 0
      },
      weight: 0,
      comments: []
    }
    addProductDB(testProduct).then((res) => {dispatch(addProduct(res))})
  }

  return (
    <div>
      <button onClick={addButtonClickHandler}>ADD</button>
      <Container>
        <Row>
          {products.map((product: ProductType) => <ProductCard key={product._id} product={product} />)}
        </Row>
      </Container>
    </div>
  )
}

export default ProductsList