import './style/main.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useSelector } from 'react-redux'
import Footer from './components/Footer'

const App = () => {

  const isLoading = useSelector((state) => state.isLoading)

  return (
    <HashRouter>
          <NavBar />
      <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/products/:id' element={<ProductDetail />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/purchases' element={<Purchases />}/>

      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
