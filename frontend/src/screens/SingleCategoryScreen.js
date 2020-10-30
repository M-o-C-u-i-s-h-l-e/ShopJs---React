import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PaginateCategory } from '../components/Paginate';
import Meta from '../components/Meta';
import { listCategorySingleProducts } from '../actions/categoryActions';

const SingleCategoryScreen = ({ match }) => {
  const [choice, setChoice] = useState(0);

  const categoryName = match.params.category;
  
  const pageNumber = match.params.pageNumber || 1;
  
  const dispatch = useDispatch();
  
  const categorySingleProducts = useSelector(state => state.categorySingleProducts);
  const { 
    loading, 
    error, 
    category, 
    page, 
    pages 
  } = categorySingleProducts;
  
  if (category.length > 0) {
    if (choice === 1) {
      category.sort((a, b) => a.price - b.price);
    } else if (choice === 2) {
      category.sort((a, b) => b.price - a.price);
    } else if (choice === 3) {
      category.sort((a, b) => a.rating - b.rating);
    } else if (choice === 4) {
      category.sort((a, b) => b.rating - a.rating);
    }
  }

  useEffect(() => {
    dispatch(listCategorySingleProducts(categoryName, pageNumber));
  }, [dispatch, categoryName, pageNumber, choice]);

  return (
    <>
      <Meta title={categoryName} />
      
      <Row className='align-items-center'>
        <Col>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        </Col>

        <Col className='text-right nav-item dropdown'>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i className="fas fa-filter"></i> Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setChoice(1)}>Price: Low to High</Dropdown.Item>
              <Dropdown.Item onClick={() => setChoice(2)}>Price: High to Low</Dropdown.Item>
              <Dropdown.Item onClick={() => setChoice(3)}>Rating: Low to High</Dropdown.Item>
              <Dropdown.Item onClick={() => setChoice(4)}>Rating: High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <h1>{categoryName}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {category.length > 0 && category.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginateCategory 
            pages={pages} 
            page={page} 
            category={categoryName} 
          />
        </>
      )}
    </>
  );
};

export default SingleCategoryScreen;
