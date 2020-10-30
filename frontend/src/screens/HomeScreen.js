import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { listCategoryAllProducts } from '../actions/categoryActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { 
    loading: loadingSearchedProducts, 
    error: errorSearchedProducts, 
    products: productsSearchedProducts, 
    page: pageSearchedProducts, 
    pages: pagesSearchedProducts 
  } = productList;

  const categoryAllProducts = useSelector(state => state.categoryAllProducts);
  const { loading, error, categories } = categoryAllProducts;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(listCategoryAllProducts());
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      
      {keyword ? (
        <>
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>

          <h1>Related Products</h1>
          {loadingSearchedProducts ? (
            <Loader />
          ) : errorSearchedProducts ? (
            <Message variant='danger'>{errorSearchedProducts}</Message>
          ) : (
            <>
              <Row>
                {productsSearchedProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate 
                pages={pagesSearchedProducts} 
                page={pageSearchedProducts} 
                keyword={keyword ? keyword : ''} 
              />
            </>
          )}
        </>
      ) : (
        <>
          <ProductCarousel />

          {loading ? (
            <Loader />
          ) : (
            error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {categories.length > 0 && categories.map((category, index) => {
                  category.products = category.products.splice(0, 4);

                  return (
                    <div key={index}>
                      <Row>
                        <Col>
                          <h1>{category.category}</h1>
                        </Col>
                        <Col className='text-right'>
                          <Link className='btn btn-secondary my-3' to={`/products/category/${category.category}`}>
                            View All
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        {category.products.map((product) => {
                          return (
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                          </Col>
                        )})}
                      </Row>
                    </div>
                  );
                })}
              </>
            )
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
