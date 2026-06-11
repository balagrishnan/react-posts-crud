const KNOWN_FIELDS = ['name', 'description', 'price', 'quantity', 'category']

export default function ProductItem({ product }) {
  const hasKnownFields = KNOWN_FIELDS.some((field) => product[field] != null)

  return (
    <article className="product-card">
      {hasKnownFields ? (
        <div className="product-card-content">
          {product.name && <h3>{product.name}</h3>}
          {product.description && <p>{product.description}</p>}
          <div className="product-meta">
            {product.price != null && <span>Price: {product.price}</span>}
            {product.quantity != null && <span>Qty: {product.quantity}</span>}
            {product.category && <span>{product.category}</span>}
            {product.id != null && <span>ID: {product.id}</span>}
          </div>
        </div>
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
