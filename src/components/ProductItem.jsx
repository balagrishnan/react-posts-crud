import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'

const KNOWN_FIELDS = ['name', 'description', 'price', 'quantity', 'category']

export default function ProductItem({ product }) {
  const [showDetails, setShowDetails] = useState(false)
  const hasKnownFields = KNOWN_FIELDS.some((field) => product[field] != null)
  const { startEdit, removeProduct } = useProducts()

  const handleClick = (event) => {
    if (window.confirm(`Delete "${product.name}"?`)) {
      removeProduct(product.id)
    }
  }

  const handleEdit = (event) => {
    startEdit(product)
    window.scrollTo({ top: 180, behavior: "smooth" })
  }

  return (
    <article className="product-card">
      {hasKnownFields ? (
        <>
          <div className="product-card-content">
            {product.name && <h3>{product.name}</h3>}
            {product.description && <p>{product.description}</p>}
            {(product.quantity != null || product.category) && (
              <button
                type="button"
                className="btn btn-link show-more-button"
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? 'Less' : 'More..'}
              </button>
            )}
            {showDetails && (
              <div>
                {product.price != null && <p className="product-meta">Price$: {product.price}/each</p>}
                {product.quantity != null && <p className="product-meta">Qty: {product.quantity}</p>}
                {product.category && <p className="product-meta">Category: {product.category}</p>}
                <p className="product-meta">Total$: {(product.quantity * product.price)}</p>
              </div>
            )}
            {/* {product.quantity != null && <span className="product-meta">Qty: {product.quantity}</span>}
            {product.category && <span className="product-meta">{product.category}</span>}
            {product.id != null && <span className="product-meta">ID: {product.id}</span>} */}
          </div>
          <div className="product-card-actions">
            {/* <button type="button" className="btn btn-secondary" onClick={() => startEdit(product)}>Edit</button> */}
            <button type="button" className="btn btn-secondary" onClick={handleEdit}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={handleClick}>Delete</button>
          </div>
        </>
      ) : (
        <div className="product-card-content">
          {Object.entries(product).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          ))}
        </div>
      )}
    </article>
  )
}
