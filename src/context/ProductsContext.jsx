import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import * as productApi from '../services/productApi'
import { initialState, productsReducer } from '../reducers/productsReducer'

export const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const loadProducts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    try {
      const products = await productApi.getProducts()
      dispatch({ type: 'FETCH_SUCCESS', payload: products })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to load products',
      })
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const addProducts = useCallback(async (formData) => {
    try {
      const newProduct = await productApi.createProduct(formData)
      dispatch({ type: 'ADD_POST', payload: newProduct })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to create product'
      })
    }
  }, [])

  const startEdit = useCallback((product) => {
    dispatch({ type: 'SET_EDITING_PRODUCT', payload: product })
  }, [])

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CLEAR_EDITING_PRODUCT' })
  }, [])

  const removeProduct = useCallback(async (id) => {
    try {
      await productApi.deleteProduct(id)
      dispatch({ type: 'DELETE_PRODUCT', payload: id })
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message || 'Failed to Delete Product'
      })
    }
  }, [])

  const value = useMemo(
    () => ({
      products: state.products,
      loading: state.loading,
      error: state.error,
      editingProduct: state.editingProduct,
      loadProducts,
      addProducts,
      startEdit,
      cancelEdit,
      removeProduct
    }),
    [state, loadProducts, addProducts, startEdit, cancelEdit, removeProduct],
  )

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}
