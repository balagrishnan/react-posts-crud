import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home-page">
      <h2>Welcome</h2>
      <p>
        This app helps you learn React with two data sources: posts from
        JSONPlaceholder and products from your local backend.
      </p>

      <div className="home-cards">
        <article className="home-card">
          <h3>Posts</h3>
          <p>
            Full CRUD demo using React Context, useReducer, and the
            JSONPlaceholder API.
          </p>
          <Link to="/posts" className="btn btn-primary">
            Go to Posts
          </Link>
        </article>

        <article className="home-card">
          <h3>Products</h3>
          <p>
            Read products from your local API at
            http://localhost:8080/api/products.
          </p>
          <Link to="/products" className="btn btn-secondary">
            Go to Products
          </Link>
        </article>
      </div>
    </section>
  )
}
