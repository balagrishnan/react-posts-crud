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

  const value = useMemo(
    () => ({
      products: state.products,
      loading: state.loading,
      error: state.error,
      loadProducts,
    }),
    [state, loadProducts],
  )

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  )
}
