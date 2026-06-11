import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostsPage from './pages/PostsPage'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <BrowserRouter>
      <div id="top" className="app">
        <Header />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
