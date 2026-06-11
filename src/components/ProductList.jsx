import { useProducts } from '../hooks/useProducts'
import ProductItem from './ProductItem'

export default function ProductList() {
  const { products, loading, error, loadProducts } = useProducts()

  if (loading) {
    return <div className="status-message">Loading products...</div>
  }

  if (error) {
    return (
      <div className="status-message error">
        <p>Error: {error}</p>
        <p className="error-hint">
          Make sure your backend is running at http://localhost:8080
        </p>
        <button type="button" className="btn btn-secondary" onClick={loadProducts}>
          Retry
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="status-message">No products found from the local API.</div>
    )
  }

  return (
    <section className="product-list">
      <h2>Local Products ({products.length})</h2>
      <p className="section-hint">Fetched from http://localhost:8080/api/products</p>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductItem
            key={product.id ?? `product-${index}`}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}
