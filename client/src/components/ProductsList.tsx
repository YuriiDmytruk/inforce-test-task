import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Container, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import { addProduct } from '../redux/ducks/products';
import { addProductDB } from '../dataManager';

import { ProductType, RootState } from '../types';

import ProductCard from './ProductCard';
import ProductModal from './ProductModal';






const CLEAR_PRODUCT = {
  _id: '',
  imageURL: '',
  name: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: 0,
  comments: [],
}

const ProductsList = () => {
  const [show, setShow] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>(CLEAR_PRODUCT);

  const [sortCriteria, setSortCriteria] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const products = useSelector((state: RootState) => state.products.products);

  const dispatch = useDispatch();

  const saveProduct = () => {
    addProductDB(product).then((res) => {
      dispatch(addProduct(res));
    });
    setProduct(CLEAR_PRODUCT);
  };

  const handleSortChange = (eventKey: string | null) => {
    if (eventKey) {
      setSortCriteria(eventKey);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortCriteria === 'count') {
      comparison = a.count - b.count;
    } else if (sortCriteria === 'width') {
      comparison = a.size.width - b.size.width;
    } else if (sortCriteria === 'height') {
      comparison = a.size.height - b.size.height;
    } else if (sortCriteria === 'weight') {
      comparison = a.weight - b.weight;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div>
      <ProductModal show={show} setShow={setShow} product={product} setProduct={setProduct} saveProduct={saveProduct} />

      <Container>
        <Row>
          <Col>
            <Button onClick={() => setShow(true)}>ADD</Button>
          </Col>

          <Col>
            <DropdownButton id="dropdown-basic-button" title="Sort Products" onSelect={handleSortChange}>
              <Dropdown.Item eventKey="name">Name</Dropdown.Item>
              <Dropdown.Item eventKey="count">Count</Dropdown.Item>
              <Dropdown.Item eventKey="width">Width</Dropdown.Item>
              <Dropdown.Item eventKey="height">Height</Dropdown.Item>
              <Dropdown.Item eventKey="weight">Weight</Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col>
            <Button onClick={toggleSortOrder}>
              {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {sortedProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductsList;
