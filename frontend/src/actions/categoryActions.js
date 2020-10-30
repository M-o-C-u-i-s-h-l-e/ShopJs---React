import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_ALL_PRODUCTS_REQUEST,
  CATEGORY_ALL_PRODUCTS_SUCCESS,
  CATEGORY_ALL_PRODUCTS_FAIL,
  CATEGORY_SINGLE_PRODUCTS_REQUEST,
  CATEGORY_SINGLE_PRODUCTS_SUCCESS,
  CATEGORY_SINGLE_PRODUCTS_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL
} from '../constants/categoryConstants';

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });

    const { data } = await axios.get('/api/category');

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST
    });

    const { data } = await axios.get(`/api/category/${id}`);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};

export const listCategoryAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ALL_PRODUCTS_REQUEST
    });

    const { data } = await axios.get('/api/products/category');

    dispatch({
      type: CATEGORY_ALL_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};

export const listCategorySingleProducts = (category, pageNumber = '') => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_SINGLE_PRODUCTS_REQUEST
    });

    const { data } = await axios.get(`/api/products/category/${category}?pageNumber=${pageNumber}`);

    dispatch({
      type: CATEGORY_SINGLE_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_SINGLE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};

export const updateCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put('/api/category', formData, config);

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};

export const deleteProductFromCategory = (category, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.put(`/api/category/${category}/${id}`, {}, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message : error.message
    });
  }
};
