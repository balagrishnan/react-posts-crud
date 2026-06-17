import { useState } from 'react';
import { useProducts } from '../hooks/useProducts'
import ProductItem from './ProductItem'

export default function ProductList() {
  const { products, loading, error, loadProducts } = useProducts()
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState('all');


  // Single column search 
  // const filtered = products.filter(p => p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  const searchLower = search.toLocaleLowerCase();
  // build category list
  const categories = Array.from(new Set(products.map(p => p.category).filter(c => c !== undefined && c !== null))).sort();

  const filtered = products.filter(p => {
    // category filter
    if (category !== 'all' && String(p.category) !== String(category)) return false

    return ['name', 'description', 'price', 'category'].some(field => {
      const val = p[field]
      if (val === undefined || val === null) return false
      return String(val).toLocaleLowerCase().includes(searchLower)
    })
  }).sort((a, b) => b.id - a.id)



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

  // if (filtered.length === 0) {
  //   return (
  //     <div className="status-message">No products found from the local API.</div>
  //   )
  // }

  return (
    <>
      <div className="post-form">
        <label htmlFor='search'>Search by Name</label>
        <input type='text' id='search' name='search' value={search} onChange={e => setSearch(e.target.value)}></input>

        <label htmlFor='categoryFilter'>Filter by Category</label>
        <select id='categoryFilter' name='categoryFilter' value={category} onChange={e => setCategory(e.target.value)}>
          <option value='all'>All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (<div className="status-message">No products found from the local API.</div>) : (<section className="product-list">
        <h2>Local Products ({filtered.length})</h2>
        <p className="section-hint">Fetched from http://localhost:8080/api/products</p>
        <div className="product-grid">
          {filtered.map((product, index) => (
            <ProductItem
              key={product.id ?? `product-${index}`}
              product={product}
            />
          ))}
        </div>
      </section>)}

    </>
  )
}
