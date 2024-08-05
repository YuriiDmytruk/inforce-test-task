import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ProductType } from '../types';
import { deleteProductDB } from '../dataManager';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/ducks/products';

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = (props: ProductCardProps) => {
  const dispatch = useDispatch();

  const deleteButtonClickHandler = () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmDelete) {
      // If confirmed, proceed with deletion
      deleteProductDB(props.product._id)
        .then((id) => {
          dispatch(deleteProduct(id));
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.product.imageURL} />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>
          Product count: {props.product.count}<br />
          Product width: {props.product.size.width}<br />
          Product height: {props.product.size.height}<br />
          Product weight: {props.product.weight}<br />
        </Card.Text>
        <Button variant="danger" onClick={deleteButtonClickHandler}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
