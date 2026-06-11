import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PostsProvider } from './context/PostsContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostsProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </PostsProvider>
  </StrictMode>,
)
