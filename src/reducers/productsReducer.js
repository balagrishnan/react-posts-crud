export const initialState = {
  products: [],
  loading: false,
  error: null,
  editingProduct: null
}

export function productsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: null }

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }

    case 'ADD_POST':
      return { ...state, products: [action.payload, ...state.products] }

    case 'SET_EDITING_PRODUCT':
      return { ...state, editingProduct: action.payload }

    case 'CLEAR_EDITING_PRODUCT':
      return { ...state, editingProduct: null }

    default:
      return state
  }
}
