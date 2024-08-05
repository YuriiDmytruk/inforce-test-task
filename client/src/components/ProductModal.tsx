import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal, Alert } from 'react-bootstrap';
import { ProductType } from '../types';

type ProductModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  product: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
  saveProduct: () => void;
};

type ErrorKeys = 'imageURL' | 'name' | 'count' | 'width' | 'height' | 'weight';

const ProductModal = (props: ProductModalProps) => {
  const [errors, setErrors] = useState<Record<ErrorKeys, string>>({
    imageURL: '',
    name: '',
    count: '',
    width: '',
    height: '',
    weight: '',
  });

  const handleClose = () => props.setShow(false);

  const validateFields = () => {
    const newErrors: Record<ErrorKeys, string> = {
      imageURL: '',
      name: '',
      count: '',
      width: '',
      height: '',
      weight: '',
    };

    let isValid = true;

    if (!props.product.imageURL.trim()) {
      newErrors.imageURL = 'Image URL cannot be empty';
      isValid = false;
    }
    if (!props.product.name.trim()) {
      newErrors.name = 'Name cannot be empty';
      isValid = false;
    }
    if (props.product.count <= 0) {
      newErrors.count = 'Count must be greater than 0';
      isValid = false;
    }
    if (props.product.size.width <= 0) {
      newErrors.width = 'Width must be greater than 0';
      isValid = false;
    }
    if (props.product.size.height <= 0) {
      newErrors.height = 'Height must be greater than 0';
      isValid = false;
    }
    if (props.product.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateFields()) {
      props.saveProduct();
      handleClose();
    } else {
      alert('Please correct the errors before saving.');
    }
  };

  const handleChange = (key: ErrorKeys, value: string) => {
    if (key === 'width' || key === 'height') {
      props.setProduct((prevProduct) => ({
        ...prevProduct,
        size: {
          ...prevProduct.size,
          [key]: Number(value),
        },
      }));
    } else {
      props.setProduct((prevProduct) => ({
        ...prevProduct,
        [key]: key === 'count' || key === 'weight' ? Number(value) : value,
      }));
    }
  };

  const input = (label: string, value: string, key: ErrorKeys, type: string = 'text') => (
    <InputGroup className="mb-3">
      <InputGroup.Text id={`inputGroup-${key}`}>
        {label}
      </InputGroup.Text>
      <Form.Control
        aria-label={label}
        aria-describedby={`inputGroup-${key}`}
        type={type}
        value={value}
        onChange={(e) => handleChange(key, e.target.value)}
      />
      {errors[key] && <Alert variant="danger">{errors[key]}</Alert>}
    </InputGroup>
  );

  const sizeInput = (label: string, dimension: 'width' | 'height', value: number) => (
    <InputGroup className="mb-3">
      <InputGroup.Text id={`inputGroup-size-${dimension}`}>
        {label} {dimension}
      </InputGroup.Text>
      <Form.Control
        aria-label={`${label} ${dimension}`}
        aria-describedby={`inputGroup-size-${dimension}`}
        type="number"
        value={value}
        onChange={(e) =>
          props.setProduct((prevProduct) => ({
            ...prevProduct,
            size: {
              ...prevProduct.size,
              [dimension]: Number(e.target.value),
            },
          }))
        }
      />
      {errors[dimension] && <Alert variant="danger">{errors[dimension]}</Alert>}
    </InputGroup>
  );

  return (
    <Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Fill in the fields</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {input('Image URL', props.product.imageURL, 'imageURL')}
        {input('Name', props.product.name, 'name')}
        {input('Count', props.product.count.toString(), 'count', 'number')}
        {sizeInput('Width', 'width', props.product.size.width)}
        {sizeInput('Height', 'height', props.product.size.height)}
        {input('Weight', props.product.weight.toString(), 'weight', 'number')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
