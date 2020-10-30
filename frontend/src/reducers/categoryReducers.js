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

export const categoryListReducer = (state = { categories: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        categories: []
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: payload
      };
    case CATEGORY_LIST_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { category: { products: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: payload
      };
    case CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export const categoryAllProductsReducer = (
  state = { categories: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case CATEGORY_ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        categories: payload
      };
    case CATEGORY_ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export const categorySingleProductsReducer = (
  state = { category: { products: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_SINGLE_PRODUCTS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case CATEGORY_SINGLE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        category: payload.products,
        page: payload.page,
        pages: payload.pages,
      };
    case CATEGORY_SINGLE_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CATEGORY_UPDATE_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export const removeProductFromCategoryReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CATEGORY_DELETE_FAIL:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};
